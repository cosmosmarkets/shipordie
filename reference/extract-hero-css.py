import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "reference" / "source.html").read_text(encoding="utf-8", errors="ignore")
links = re.findall(r'href="(/_next/static/chunks/[^"]+\.css[^"]*)"', html)
out = ROOT / "src" / "styles" / "hero-live.css"
out.parent.mkdir(parents=True, exist_ok=True)
chunks = []
for link in links[:4]:
    url = "https://www.ship-or-die.com" + link.split("?")[0]
    try:
        chunks.append(urllib.request.urlopen(url, timeout=30).read().decode("utf-8", errors="ignore"))
    except Exception as e:
        chunks.append(f"/* failed {url}: {e} */")
text = "\n".join(chunks)
# Keep hero-related rules only
keywords = (
    "pirate", "ship", "storm", "wave", "crew-sprite", "captain", "slacker",
    "fall-sprite", "splash", "scene-", "pirate-rain", "moon", "cloud",
)
# Minified CSS is often one line — extract brace blocks containing keywords
blocks = []
i = 0
while i < len(text):
    if text[i] == "." or text[i] == "@":
        start = i
        depth = 0
        j = i
        while j < len(text):
            if text[j] == "{":
                depth += 1
            elif text[j] == "}":
                depth -= 1
                if depth == 0:
                    block = text[start : j + 1]
                    if any(k in block for k in keywords):
                        blocks.append(block)
                    i = j + 1
                    break
            j += 1
        else:
            break
    else:
        i += 1
out.write_text("\n\n".join(blocks) if blocks else text[:300000], encoding="utf-8")
lines = blocks
print(f"Wrote {out} ({len(lines)} filtered lines, {len(chunks)} chunks)")
