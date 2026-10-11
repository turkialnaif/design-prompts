"""Pre-renders the company profile's navy duotone photographs (so the PDF stays small and needs no blend modes).
Run from the project root:  python3 scripts/make-profile-assets.py
"""
from PIL import Image, ImageOps, ImageEnhance
import os

OUT = "public/brand/profile"
os.makedirs(OUT, exist_ok=True)


def duotone(path, width, out, contrast=1.12, quality=72):
    im = Image.open(path).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    g = ImageOps.grayscale(im)
    g = ImageEnhance.Contrast(g).enhance(contrast)
    d = ImageOps.colorize(g, black="#00061d", mid="#0b2a7e", white="#a9bdf2", blackpoint=5, whitepoint=235)
    d.save(f"{OUT}/{out}", quality=quality, optimize=True, progressive=True)
    print(out, d.size, os.path.getsize(f"{OUT}/{out}") // 1024, "KB")


duotone("public/brand/riyadh-kafd.jpg", 1500, "city-kafd.jpg")
duotone("public/brand/riyadh-skyline.jpg", 1500, "city-skyline.jpg")
for slug in ["legal-advisory", "corporate-contracts", "disputes-arbitration", "compliance-governance", "technology-data", "enforcement-recovery"]:
    duotone(f"public/services/{slug}.jpg", 900, f"thumb-{slug}.jpg", quality=78)
