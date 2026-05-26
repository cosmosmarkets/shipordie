import re
from pathlib import Path
src = Path(__file__).parent / "source.html"
text = src.read_text(encoding="utf-8")
css = re.findall(r'href="(/_next/static/css/[^"]+)"', text)
js = re.findall(r'src="(/_next/static/chunks/[^"]+)"', text)
print("CSS:", len(css))
for c in css: print(c)
print("JS:", len(js))
for j in js[:15]: print(j)
