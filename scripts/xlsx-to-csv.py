"""يحوّل ورقة «الشركات» من ملف شركات الرياض (xlsx) إلى CSV بأعمدة ثابتة، بلا أي مكتبة خارجية.
الاستعمال: python3 scripts/xlsx-to-csv.py input.xlsx output.csv"""
import csv, html, re, sys, zipfile

src, dst = sys.argv[1], sys.argv[2]
z = zipfile.ZipFile(src)
names = z.namelist()
shared = []
if "xl/sharedStrings.xml" in names:
    shared = [html.unescape(re.sub(r"<[^>]+>", "", m)) for m in re.findall(r"<(?:x:)?si>(.*?)</(?:x:)?si>", z.read("xl/sharedStrings.xml").decode("utf8"), re.S)]

def cells(row):
    out = []
    for attrs, body in re.findall(r"<(?:x:)?c ([^>]*?)(?:/>|>(.*?)</(?:x:)?c>)", row, re.S):
        v = html.unescape(re.sub(r"<[^>]+>", "", body or ""))
        if 't="s"' in attrs and v.isdigit():
            v = shared[int(v)]
        out.append(v.strip())
    return out

sheet = [n for n in names if n.startswith("xl/worksheets/sheet")]
sheet.sort()
x = z.read(sheet[1]).decode("utf8")  # الورقة الثانية: الشركات
rows = re.findall(r"<(?:x:)?row[^>]*>(.*?)</(?:x:)?row>", x, re.S)
head = ["id", "name", "name_en", "sector", "tier", "size", "phone", "extra_phones", "email", "email_type", "website", "whatsapp", "address", "services", "role", "category", "presence", "source", "date"]
with open(dst, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(head + ["size_evidence", "size_source"])
    n = 0
    for r in rows[4:]:
        c = cells(r)
        if len(c) < 10 or not c[0].startswith("RYD-"):
            continue
        c += [""] * 23
        w.writerow(c[:19] + [c[21], c[22]])
        n += 1
print(n, "rows")
