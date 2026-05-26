"""Extract community members from Ship or Die HTML."""
import json
import re
from pathlib import Path

src = Path(__file__).parent / "source.html"
out = Path(__file__).parent / "crew-members.json"

text = src.read_text(encoding="utf-8")

# Community section is near end — member names appear as text nodes before "startups shipped"
members = []
for m in re.finditer(
    r"(?:>|^)([^<>\n]{2,45}?)\s*(\d+)\s*startups?\s*shipped(?:\s*view profile)?",
    text,
    re.I,
):
    name = m.group(1).strip()
    # Clean artifacts
    name = re.sub(r"^(New pirate|slow chaz|@)", "", name).strip()
    if not name or len(name) < 2:
        continue
    if any(x in name.lower() for x in ("http", "script", "style", "class=")):
        continue
    members.append({"name": name, "startups_shipped": int(m.group(2))})

# Dedupe by name (keep last occurrence = likely correct section)
by_name = {}
for m in members:
    by_name[m["name"]] = m

crew = sorted(by_name.values(), key=lambda x: (-x["startups_shipped"], x["name"].lower()))

data = {
    "total_parsed": len(crew),
    "stats": {
        "with_shipped_startups": sum(1 for c in crew if c["startups_shipped"] > 0),
        "max_shipped": max((c["startups_shipped"] for c in crew), default=0),
    },
    "members": crew,
}

out.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"Extracted {len(crew)} crew members")
