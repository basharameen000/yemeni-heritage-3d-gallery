import os
import math
from PIL import Image, ImageDraw, ImageFilter

out_dir = r"C:\Users\Bashar\.gemini\antigravity\scratch\group4_virtual_gallery\assets"
os.makedirs(out_dir, exist_ok=True)

# 1. Generate Sanaani Qamariyah Window (القمريّة الصنعانية بالزجاج المعشق)
w, h = 1024, 600
qam_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
d = ImageDraw.Draw(qam_img)

cx, cy = w // 2, h - 30
radius = min(w // 2 - 40, h - 60)

# Colored Glass Segments (Ruby, Cobalt, Emerald, Amber, Violet)
glass_colors = [
    (220, 38, 38, 230),   # Ruby
    (37, 99, 235, 230),   # Cobalt
    (16, 185, 129, 230),  # Emerald
    (245, 158, 11, 230),  # Amber
    (147, 51, 234, 230),  # Violet
    (6, 182, 212, 230)    # Cyan
]

# Radiating segments in semicircle
num_spokes = 16
for i in range(num_spokes):
    ang1 = math.pi * (i / num_spokes)
    ang2 = math.pi * ((i + 1) / num_spokes)
    c = glass_colors[i % len(glass_colors)]
    
    # Outer ring
    pts_outer = [
        (cx, cy),
        (cx - int(radius * math.cos(ang1)), cy - int(radius * math.sin(ang1))),
        (cx - int(radius * math.cos(ang2)), cy - int(radius * math.sin(ang2)))
    ]
    d.polygon(pts_outer, fill=c)
    
    # Middle ring inner jewel
    c_inner = glass_colors[(i + 2) % len(glass_colors)]
    r_mid = radius * 0.6
    r_in = radius * 0.3
    pts_mid = [
        (cx - int(r_in * math.cos(ang1)), cy - int(r_in * math.sin(ang1))),
        (cx - int(r_mid * math.cos(ang1)), cy - int(r_mid * math.sin(ang1))),
        (cx - int(r_mid * math.cos(ang2)), cy - int(r_mid * math.sin(ang2))),
        (cx - int(r_in * math.cos(ang2)), cy - int(r_in * math.sin(ang2)))
    ]
    d.polygon(pts_mid, fill=c_inner)

# Intricate White Gypsum Tracery (الجص الأبيض المفرغ)
gypsum_color = (250, 250, 248, 255)
d.arc([cx - radius, cy - radius, cx + radius, cy + radius], start=180, end=360, fill=gypsum_color, width=18)
d.arc([cx - int(radius*0.6), cy - int(radius*0.6), cx + int(radius*0.6), cy + int(radius*0.6)], start=180, end=360, fill=gypsum_color, width=14)
d.arc([cx - int(radius*0.3), cy - int(radius*0.3), cx + int(radius*0.3), cy + int(radius*0.3)], start=180, end=360, fill=gypsum_color, width=12)
d.line([(cx - radius, cy), (cx + radius, cy)], fill=gypsum_color, width=18)

for i in range(num_spokes + 1):
    ang = math.pi * (i / num_spokes)
    px = cx - int(radius * math.cos(ang))
    py = cy - int(radius * math.sin(ang))
    d.line([(cx, cy), (px, py)], fill=gypsum_color, width=10)

qam_path = os.path.join(out_dir, "qamariyah.png")
qam_img.save(qam_path, "PNG")
print("Qamariyah window texture generated.")

# 2. Generate Qamariyah Colored Light Projection (بقعة الضوء الكاليدوسكوبية على الأرضية)
patch_size = 1024
patch_img = Image.new("RGBA", (patch_size, patch_size), (0, 0, 0, 0))
pd = ImageDraw.Draw(patch_img)
pcx, pcy = patch_size // 2, patch_size // 2

for i in range(24):
    ang = (i / 24) * math.pi * 2
    dist = 120 + (i % 4) * 70
    x = pcx + int(dist * math.cos(ang))
    y = pcy + int(dist * math.sin(ang))
    c = glass_colors[i % len(glass_colors)]
    r = 50 + (i % 3) * 25
    pd.ellipse([x - r, y - r, x + r, y + r], fill=(c[0], c[1], c[2], 130))

patch_img = patch_img.filter(ImageFilter.GaussianBlur(35))
patch_path = os.path.join(out_dir, "qamariyah_light_patch.png")
patch_img.save(patch_path, "PNG")
print("Qamariyah light projection generated.")

# 3. Generate Yemeni Painted Coffered Ceiling (سقف المصندقات الخشبية الصنعانية)
c_w, c_h = 1024, 1024
ceil_img = Image.new("RGB", (c_w, c_h), (55, 30, 18))
cd = ImageDraw.Draw(ceil_img)

grid_n = 4
cell_w = c_w // grid_n
cell_h = c_h // grid_n

for gx in range(grid_n):
    for gy in range(grid_n):
        bx = gx * cell_w
        by = gy * cell_h
        
        # Wood border beam
        cd.rectangle([bx, by, bx + cell_w, by + cell_h], outline=(30, 15, 8), width=8)
        cd.rectangle([bx + 8, by + 8, bx + cell_w - 8, by + cell_h - 8], fill=(90, 45, 25))
        
        # Islamic Star rosette in each coffer
        mid_x = bx + cell_w // 2
        mid_y = by + cell_h // 2
        
        cd.rectangle([bx + 24, by + 24, bx + cell_w - 24, by + cell_h - 24], fill=(120, 25, 25))
        cd.rectangle([bx + 40, by + 40, bx + cell_w - 40, by + cell_h - 40], outline=(212, 175, 55), width=4)
        
        # 8-pointed star in gold and cobalt
        r_star = 50
        pts_star1 = [
            (mid_x, mid_y - r_star), (mid_x + r_star, mid_y),
            (mid_x, mid_y + r_star), (mid_x - r_star, mid_y)
        ]
        pts_star2 = [
            (mid_x - int(r_star*0.7), mid_y - int(r_star*0.7)),
            (mid_x + int(r_star*0.7), mid_y - int(r_star*0.7)),
            (mid_x + int(r_star*0.7), mid_y + int(r_star*0.7)),
            (mid_x - int(r_star*0.7), mid_y + int(r_star*0.7))
        ]
        cd.polygon(pts_star1, fill=(212, 175, 55))
        cd.polygon(pts_star2, fill=(20, 60, 140))
        cd.ellipse([mid_x - 18, mid_y - 18, mid_x + 18, mid_y + 18], fill=(212, 175, 55))

ceil_path = os.path.join(out_dir, "yemeni_coffered_ceiling.jpg")
ceil_img.save(ceil_path, quality=90)
print("Yemeni coffered ceiling texture generated.")

# 4. Generate Yemeni Basalt & White Gypsum Trim (حجر الحبش والزخرفة الجبسية الصنعانية)
b_w, b_h = 1024, 512
base_img = Image.new("RGB", (b_w, b_h), (35, 36, 40)) # Basalt
bd = ImageDraw.Draw(base_img)

# Basalt Stone blocks
stone_h = 64
for y in range(0, b_h - 120, stone_h):
    bd.line([(0, y), (b_w, y)], fill=(20, 20, 22), width=3)
    offset = (y // stone_h) * 120
    for x in range(0, b_w, 200):
        bd.line([(x + offset) % b_w, y, (x + offset) % b_w, y + stone_h], fill=(20, 20, 22), width=3)

# White Gypsum Chevron / Zigzag Frize on top (حزام الزخارف الجصية)
top_y = b_h - 110
bd.rectangle([0, top_y, b_w, b_h], fill=(245, 245, 240))
# Terracotta brick band
bd.rectangle([0, top_y + 15, b_w, top_y + 45], fill=(160, 60, 40))

# White Gypsum Sawtooth / Zigzag
zig_w = 40
for x in range(0, b_w, zig_w):
    bd.polygon([
        (x, top_y + 45),
        (x + zig_w // 2, top_y + 15),
        (x + zig_w, top_y + 45)
    ], fill=(245, 245, 240))

base_path = os.path.join(out_dir, "yemeni_wall_base.jpg")
base_img.save(base_path, quality=90)
print("Yemeni wall base texture generated.")
