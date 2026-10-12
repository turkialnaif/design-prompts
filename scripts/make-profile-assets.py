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


# --- stationery: print-safe recolours of the lockup (flat colour, no CSS masks) and a skyline with its fade baked into the alpha ---
def recolour_lockup(rgb, out):
    src = Image.open("public/brand/logo-lockup.png").convert("RGBA")
    a = src.getchannel("A")
    solid = Image.new("RGBA", src.size, rgb + (255,))
    solid.putalpha(a)
    solid.save(f"{OUT}/{out}", optimize=True)
    print(out, solid.size)


recolour_lockup((0, 18, 74), "lockup-navy.png")
recolour_lockup((216, 174, 85), "lockup-gold.png")

city = Image.open(f"{OUT}/city-kafd.jpg").convert("RGBA")
w, h = city.size
fade = Image.linear_gradient("L").rotate(180).resize((w, h))  # 255 at the top -> 0 at the bottom, flipped below
fade = fade.transpose(Image.FLIP_TOP_BOTTOM)  # 0 at the top -> 255 at the bottom
fade = fade.point(lambda v: min(255, int(v * 1.35)))
city.putalpha(fade)
city = city.resize((1100, round(1100 * h / w)), Image.LANCZOS)
city.save(f"{OUT}/city-fade.png", optimize=True)
print("city-fade.png", city.size, os.path.getsize(f"{OUT}/city-fade.png") // 1024, "KB")
