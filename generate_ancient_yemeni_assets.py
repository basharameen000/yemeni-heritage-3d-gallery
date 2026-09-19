import os
import math
from PIL import Image, ImageDraw, ImageFilter

out_dir = r"C:\Users\Bashar\.gemini\antigravity\scratch\group4_virtual_gallery\assets"
os.makedirs(out_dir, exist_ok=True)

# 1. Weathered Yemeni Basalt / Sandstone Blocks (حجر الحبش والبلق العتيق)
w, h = 1024, 1024
stone_img = Image.new("RGB", (w, h), (85, 78, 72))
sd = ImageDraw.Draw(stone_img)

row_h = 96
for y_idx, y in enumerate(range(0, h, row_h)):
    col_offset = (y_idx % 2) * 140
    for x in range(-140, w + 140, 260):
        bx = x + col_offset
        # Vary stone hue
        var = int(15 * math.sin(bx * 0.05) + 12 * math.cos(y * 0.08))
        base_c = (85 + var, 78 + var, 72 + var - 5)
        sd.rectangle([bx + 4, y + 4, bx + 254, y + row_h - 4], fill=base_c)
        # Deep rough mortar lines
        sd.rectangle([bx, y, bx + 260, y + row_h], outline=(42, 38, 35), width=4)

stone_img = stone_img.filter(ImageFilter.GaussianBlur(1.5))
stone_img.save(os.path.join(out_dir, "ancient_stone_wall.jpg"), quality=90)
print("Ancient stone wall texture generated.")

# 2. Heavy Rustic Timber Trunk Ceiling (سقف الجذوع والعوارض الخشبية)
c_w, c_h = 1024, 1024
timber_img = Image.new("RGB", (c_w, c_h), (55, 38, 28))
td = ImageDraw.Draw(timber_img)

beam_w = 80
for x in range(0, c_w, beam_w):
    shade = int(50 + 15 * math.sin(x * 0.1))
    td.rectangle([x, 0, x + beam_w - 4, c_h], fill=(shade, shade - 15, shade - 25))
    td.line([x + beam_w - 2, 0, x + beam_w - 2, c_h], fill=(25, 18, 12), width=4)
    # Cross joists
    for cy in range(0, c_h, 128):
        td.line([x, cy, x + beam_w, cy], fill=(30, 20, 14), width=3)

timber_img = timber_img.filter(ImageFilter.GaussianBlur(1))
timber_img.save(os.path.join(out_dir, "rustic_timber_ceiling.jpg"), quality=90)
print("Rustic timber ceiling texture generated.")

# 3. Woven Palm Leaf Mat (الحصير الخوصي المجدول)
m_w, m_h = 1024, 1024
mat_img = Image.new("RGB", (m_w, m_h), (185, 155, 115))
md = ImageDraw.Draw(mat_img)

stripe_w = 16
for y in range(0, m_h, stripe_w):
    for x in range(0, m_w, stripe_w * 2):
        shade = 175 if ((x // (stripe_w * 2)) + (y // stripe_w)) % 2 == 0 else 195
        md.rectangle([x, y, x + stripe_w * 2, y + stripe_w], fill=(shade, shade - 30, shade - 65), outline=(130, 105, 75))

mat_img = mat_img.filter(ImageFilter.GaussianBlur(0.8))
mat_img.save(os.path.join(out_dir, "woven_palm_mat.jpg"), quality=90)
print("Woven palm mat texture generated.")

# 4. Circular Woven Palm Plate (المسرف / الجونة الخوصية المنقوشة)
p_size = 800
plate_img = Image.new("RGBA", (p_size, p_size), (0, 0, 0, 0))
pd = ImageDraw.Draw(plate_img)
pcx, pcy = p_size // 2, p_size // 2

# Concentric woven rings with traditional dyed red/green/straw strands
colors = [
    (195, 160, 110, 255), # Straw
    (165, 42, 42, 255),   # Terracotta Red
    (195, 160, 110, 255), # Straw
    (46, 117, 89, 255),   # Forest Green
    (195, 160, 110, 255), # Straw
    (180, 50, 30, 255),   # Crimson
    (210, 180, 125, 255)  # Natural beige
]

max_r = p_size // 2 - 20
ring_step = max_r // len(colors)
for idx, c in enumerate(reversed(colors)):
    cur_r = max_r - idx * ring_step
    pd.ellipse([pcx - cur_r, pcy - cur_r, pcx + cur_r, pcy + cur_r], fill=c, outline=(80, 60, 40, 200), width=4)

# Radial spiral stitching
for ang in range(0, 360, 12):
    rad = math.radians(ang)
    ex = pcx + int(max_r * math.cos(rad))
    ey = pcy + int(max_r * math.sin(rad))
    pd.line([(pcx, pcy), (ex, ey)], fill=(120, 95, 65, 120), width=2)

plate_img.save(os.path.join(out_dir, "woven_palm_plate.png"), "PNG")
print("Woven palm plate texture generated.")

# 5. Traditional Yemeni Kelim Rug (السجاد اليمني / الكليم التراثي)
r_w, r_h = 1024, 600
rug_img = Image.new("RGB", (r_w, r_h), (145, 30, 25))
rd = ImageDraw.Draw(rug_img)

# Outer borders
rd.rectangle([10, 10, r_w - 10, r_h - 10], outline=(210, 175, 110), width=16)
rd.rectangle([32, 32, r_w - 32, r_h - 32], outline=(25, 35, 65), width=12)

# Central diamond motifs
diamond_w = 120
for cx in range(90, r_w - 70, diamond_w):
    cy = r_h // 2
    pts = [(cx, cy - 80), (cx + 50, cy), (cx, cy + 80), (cx - 50, cy)]
    rd.polygon(pts, fill=(25, 35, 65), outline=(210, 175, 110))
    pts_in = [(cx, cy - 50), (cx + 30, cy), (cx, cy + 50), (cx - 30, cy)]
    rd.polygon(pts_in, fill=(210, 175, 110))

rug_img = rug_img.filter(ImageFilter.GaussianBlur(1))
rug_img.save(os.path.join(out_dir, "yemeni_kelim_rug.jpg"), quality=92)
print("Yemeni kelim rug texture generated.")

# 6. Stone Flagstone Floor (أرضية الحجر البازلتي العتيق)
f_w, f_h = 1024, 1024
floor_img = Image.new("RGB", (f_w, f_h), (95, 90, 85))
fd = ImageDraw.Draw(floor_img)

tile_w = 128
for y in range(0, f_h, tile_w):
    for x in range(0, f_w, tile_w):
        var = int(18 * math.sin(x * 0.08) + 14 * math.cos(y * 0.06))
        c = (95 + var, 90 + var, 85 + var)
        fd.rectangle([x + 3, y + 3, x + tile_w - 3, y + tile_w - 3], fill=c)
        fd.rectangle([x, y, x + tile_w, y + tile_w], outline=(40, 38, 35), width=3)

floor_img = floor_img.filter(ImageFilter.GaussianBlur(1))
floor_img.save(os.path.join(out_dir, "ancient_flagstone_floor.jpg"), quality=90)
print("Ancient flagstone floor texture generated.")
