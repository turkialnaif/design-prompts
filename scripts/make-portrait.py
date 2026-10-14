"""Builds the firm portrait: the original studio photo lifted off its white wall and placed in front of a navy wall carrying the TAAP mark.
Outputs: public/brand/attorney-turki.jpg (site) and docs/whatsapp/avatar-turki-1024.jpg (profile picture).
Run from the project root:  python3 scripts/make-portrait.py <original.jpg>
Needs only Pillow and numpy. The face is not retouched: only the background changes."""
import sys
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else "public/brand/attorney-turki.jpg"
MARK = "public/brand/logo-mark.png"
im = Image.open(SRC).convert("RGB")
W, H = im.size
a = np.asarray(im).astype(np.int16)

# 1) the wall: near-white and colourless pixels reachable from the image border
lenient = (a.min(axis=2) >= 224) & ((a.max(axis=2) - a.min(axis=2)) <= 18)
strict = (a.min(axis=2) >= 239) & ((a.max(axis=2) - a.min(axis=2)) <= 10)  # lower down, the wall is brighter than the grey-white sleeves
low = (np.arange(H)[:, None] >= int(H * 0.86)) & np.ones((1, W), bool)
cand = np.where(low, strict, lenient)
wall = np.zeros_like(cand)
wall[0, :] = cand[0, :]
wall[:, 0] = cand[:, 0]
wall[:, -1] = cand[:, -1]
while True:  # grow the wall from the border through connected candidate pixels
    g = wall.copy()
    g[1:, :] |= wall[:-1, :]
    g[:-1, :] |= wall[1:, :]
    g[:, 1:] |= wall[:, :-1]
    g[:, :-1] |= wall[:, 1:]
    g &= cand
    if (g == wall).all():
        break
    wall = g
subject = ~wall

# 2) clean the mask: drop specks, fill pinholes, soften the edge a little
m = Image.fromarray((subject * 255).astype(np.uint8))
m = m.filter(ImageFilter.MedianFilter(7))
m = m.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.MinFilter(11))  # close pinholes
heavy = m.filter(ImageFilter.MedianFilter(31))  # the sleeve line below the shoulders is ragged: smooth it harder
lowmask = Image.new("L", m.size, 0)
ImageDraw.Draw(lowmask).rectangle([0, int(H * 0.80), W, H], fill=255)
m = Image.composite(heavy, m, lowmask.filter(ImageFilter.GaussianBlur(30)))
m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.4))
m = m.point(lambda v: 0 if v < 70 else (255 if v > 190 else int((v - 70) * 255 / 120)))

# 3) the new wall: deep navy with a warm pool of light behind the head
bg = np.zeros((H, W, 3), np.float32)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
cx, cy = W * 0.5, H * 0.34
d = np.sqrt(((xx - cx) / (W * 0.62)) ** 2 + ((yy - cy) / (H * 0.62)) ** 2)
t = np.clip(d, 0, 1)[..., None]
inner = np.array([14, 42, 126], np.float32)   # #0e2a7e
outer = np.array([0, 6, 29], np.float32)      # #00061d
bg = inner * (1 - t) ** 1.25 + outer * (1 - (1 - t) ** 1.25)
wall_img = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8))

# 4) the mark: a large architectural line-drawing behind the shoulders, plus the solid mark as a small seal at the upper corner
mark = Image.open(MARK).convert("RGBA")
GOLD = (208, 167, 81)


# a double gold ring behind the head, like the medallion of a seal; the lintel-and-columns mark sits on it as the signature
SS = 3
rl = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0))
rd = ImageDraw.Draw(rl)
cx_, cy_, r_ = W * 0.5 * SS, H * 0.43 * SS, W * 0.43 * SS
rd.ellipse([cx_ - r_, cy_ - r_, cx_ + r_, cy_ + r_], outline=GOLD + (200,), width=int(3.2 * SS))
r2 = r_ + 20 * SS
rd.ellipse([cx_ - r2, cy_ - r2, cx_ + r2, cy_ + r2], outline=GOLD + (95,), width=int(1.6 * SS))
line_layer = rl.resize((W, H), Image.LANCZOS)
wall_rgba = wall_img.convert("RGBA")
wall_rgba.alpha_composite(line_layer.filter(ImageFilter.GaussianBlur(8)))
wall_rgba.alpha_composite(line_layer)

def build(seal_xy):
    canvas = wall_rgba.copy()
    seal_w = int(W * 0.13)
    seal = mark.resize((seal_w, int(mark.height * seal_w / mark.width)), Image.LANCZOS)
    seal_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    seal_layer.alpha_composite(seal, seal_xy)
    canvas.alpha_composite(seal_layer.filter(ImageFilter.GaussianBlur(10)))
    canvas.alpha_composite(seal_layer)

    # 5) a hairline of gold along the foot of the frame, like the lintel of the mark
    line = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(line).rectangle([int(W * 0.08), H - 10, int(W * 0.92), H - 7], fill=GOLD + (190,))
    canvas.alpha_composite(line)

    # 6) the subject back on top, cooled a touch so the white of the garments sits in the navy light
    subj = im.copy()
    sa = np.asarray(subj).astype(np.float32)
    sa[..., 0] *= 0.985
    sa[..., 2] = np.minimum(255, sa[..., 2] * 1.02)
    subj = Image.fromarray(sa.astype(np.uint8))
    out = canvas.convert("RGB")
    out.paste(subj, (0, 0), m)
    fade = np.zeros((H, W), np.float32)
    y0 = int(H * 0.72)
    fade[y0:, :] = np.linspace(0, 1, H - y0)[:, None] ** 1.25
    navy = np.array([0, 6, 29], np.float32)
    oa = np.asarray(out).astype(np.float32)
    oa = oa * (1 - 0.99 * fade[..., None]) + navy * (0.99 * fade[..., None])
    out = Image.fromarray(oa.astype(np.uint8))

    return out


out = build((int(W * 0.765), int(H * 0.09)))
out.save("public/brand/attorney-turki.jpg", quality=90, optimize=True, progressive=True)
print("site", out.size)

# WhatsApp: square, head and shoulders, centred high so the round crop keeps the face clear of the edge
side = int(W * 0.96)
out_av = build((int(W * 0.15), int(H * 0.235)))
left = (W - side) // 2
top = int(H * 0.02)
sq = out_av.crop((left, top, left + side, top + side)).resize((1024, 1024), Image.LANCZOS)
import os
os.makedirs("docs/whatsapp", exist_ok=True)
sq.save("docs/whatsapp/avatar-turki-1024.jpg", quality=92, optimize=True)
# preview with the circular mask WhatsApp applies
circ = Image.new("L", (1024, 1024), 0)
ImageDraw.Draw(circ).ellipse([0, 0, 1023, 1023], fill=255)
prev = Image.new("RGB", (1024, 1024), (240, 240, 240))
prev.paste(sq, (0, 0), circ)
prev.save("/tmp/avatar-circle-preview.jpg", quality=88)
Image.fromarray(np.asarray(m)).save("/tmp/portrait-mask.png")
print("avatar ok")
