import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const REMOTE = 'https://www.ship-or-die.com';
const PORT = Number(process.env.PORT) || 3001;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function safeJoin(base, target) {
  const resolved = path.normalize(path.join(base, target));
  if (!resolved.startsWith(base)) return null;
  return resolved;
}

function findLocalFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const rel = clean.replace(/^\//, '');

  const candidates = [
    safeJoin(ROOT, clean),
    safeJoin(ROOT, path.join('assets', rel)),
    safeJoin(ROOT, rel),
  ].filter(Boolean);

  for (const filePath of candidates) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return filePath;
    }
  }

  const basename = path.basename(clean);
  const searchDirs = [
    safeJoin(ROOT, path.join('assets', path.dirname(rel))),
    safeJoin(ROOT, path.join('assets', '_next', 'static', 'media')),
    safeJoin(ROOT, 'assets', 'external'),
  ].filter(Boolean);

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    for (const name of fs.readdirSync(dir)) {
      const candidate = path.join(dir, name);
      if (!fs.statSync(candidate).isFile()) continue;
      if (name === basename || name.startsWith(basename) || name.startsWith(basename.replace(/\.[^.]+$/, ''))) {
        return candidate;
      }
    }
  }

  return null;
}

function proxyRemote(req, res, remotePath) {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const url = `${REMOTE}${remotePath}${query}`;

  https
    .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: '*/*' } }, (proxyRes) => {
      const headers = { ...proxyRes.headers };
      delete headers['transfer-encoding'];
      res.writeHead(proxyRes.statusCode || 502, headers);
      proxyRes.pipe(res);
    })
    .on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end(`Proxy error: ${err.message}`);
    });
}

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) res.writeHead(500);
    res.end('Read error');
  });
  stream.pipe(res);
}

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);

    if (urlPath === '/') urlPath = '/index.html';

    if (urlPath === '/index.html') {
      const index = path.join(ROOT, 'index.html');
      const source = path.join(ROOT, 'source.html');
      if (fs.existsSync(index)) return sendFile(res, index);
      if (fs.existsSync(source)) return sendFile(res, source);
    }

    if (urlPath.startsWith('/_next/image')) {
      try {
        const params = new URL(req.url, `http://127.0.0.1:${PORT}`);
        const inner = params.get('url');
        if (inner) {
          const innerPath = inner.startsWith('http') ? new URL(inner).pathname : inner.split('?')[0];
          const local = findLocalFile(innerPath);
          if (local) return sendFile(res, local);
          if (inner.startsWith('http')) return proxyRemote(req, res, innerPath);
          return proxyRemote(req, res, `/_next/image${req.url.slice(req.url.indexOf('?'))}`);
        }
      } catch {
        /* fall through */
      }
    }

    const local = findLocalFile(urlPath);
    if (local) return sendFile(res, local);

    if (urlPath.startsWith('/_next/') || urlPath.startsWith('/landing/') || urlPath.startsWith('/images/')) {
      return proxyRemote(req, res, urlPath);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${urlPath}`);
  })
  .listen(PORT, () => {
    console.log(`Ship or Die → http://localhost:${PORT}`);
    console.log(`Serving: ${ROOT}`);
  });
