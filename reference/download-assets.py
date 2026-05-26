"""Download key Ship or Die assets (direct paths only)."""
import html
import json
import re
import urllib.request
from pathlib import Path

BASE = "https://www.ship-or-die.com"
ROOT = Path(__file__).parent
SRC = (ROOT / "source.html").read_text(encoding="utf-8")
ASSETS = ROOT / "assets"
ASSETS.mkdir(exist_ok=True)

# Direct static media paths (not Next image optimizer)
direct = set(re.findall(r"/_next/static/media/[a-zA-Z0-9._~-]+\.(?:webp|png|jpg|jpeg|gif|svg|woff2)(?:\?[^\"'\s>]*)?", SRC))
direct |= set(re.findall(r"/landing/[a-zA-Z0-9/_-]+\.(?:webp|png|jpg|jpeg|gif|svg)", SRC))
direct |= set(re.findall(r"/images/[a-zA-Z0-9/_-]+\.(?:webp|png|jpg|jpeg|gif|svg)", SRC))

# OG images
direct.add("/opengraph-image.png")
direct.add("/twitter-image.png")

# CloudFront avatars (direct CDN)
cloudfront = sorted(set(re.findall(r"https://djinh5srvzpwp\.cloudfront\.net/avatars/[^\"'\s>]+", SRC)))

# Decode next/image src paths to underlying URLs
next_images = []
for m in re.finditer(r'/_next/image\?url=([^&"\']+)', html.unescape(SRC)):
    encoded = m.group(1)
    from urllib.parse import unquote

    path = unquote(encoded)
    if path.startswith("http"):
        next_images.append(path)
    else:
        direct.add(path.split("?")[0])

results = {"ok": [], "fail": []}


def fetch(url: str, dest: Path):
    if dest.exists() and dest.stat().st_size > 100:
        results["ok"].append(str(dest.relative_to(ROOT)))
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            dest.write_bytes(r.read())
        results["ok"].append(str(dest.relative_to(ROOT)))
        print("OK", dest.name)
    except Exception as e:
        results["fail"].append({"url": url, "error": str(e)})
        print("FAIL", url[:80], e)


for path in sorted(direct):
    url = BASE + path.split("?")[0]
    rel = path.lstrip("/").replace("?", "_")
    fetch(url, ASSETS / rel)

for url in cloudfront:
    rel = "avatars/" + url.split("/avatars/")[1]
    fetch(url, ASSETS / rel)

for url in sorted(set(next_images)):
    rel = "external/" + re.sub(r"[^\w.\-]", "_", url.split("//")[1])
    fetch(url, ASSETS / rel)

(ROOT / "download-results.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
print(f"\nOK: {len(results['ok'])}, FAIL: {len(results['fail'])}")
