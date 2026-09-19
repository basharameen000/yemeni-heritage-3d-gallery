import json
import os
import math
from PIL import Image, ImageDraw, ImageFilter

out_dir = r"C:\Users\Bashar\.gemini\antigravity\scratch\group4_virtual_gallery\assets"
art_dir = os.path.join(out_dir, "artworks")
os.makedirs(art_dir, exist_ok=True)

# 1. Generate Realistic Wood Parquet Diffuse & Normal
w, h = 1024, 1024
wood_img = Image.new("RGB", (w, h), (185, 145, 105))
draw = ImageDraw.Draw(wood_img)

plank_h = 64
for y in range(0, h, plank_h):
    shade = int(170 + 20 * math.sin(y * 0.1))
    draw.rectangle([0, y, w, y + plank_h - 2], fill=(shade, shade - 35, shade - 70))
    # Plank divisions
    for x in range(0, w, 256):
        draw.line([x + (y % 128), y, x + (y % 128), y + plank_h], fill=(120, 90, 60), width=2)

wood_img = wood_img.filter(ImageFilter.GaussianBlur(1))
wood_img.save(os.path.join(out_dir, "wood_parquet.jpg"), quality=92)
print("Wood parquet texture generated.")

# 2. Curated Artworks (Inspired by Group 4 Exhibit)
artworks_data = [
    {
        "id": "art_1",
        "title": "Portrait of Resilience (صمود)",
        "artist": "Group 4 Contemporary",
        "medium": "Oil & Acrylic on Canvas",
        "year": "2022",
        "description": "A vibrant expressionist portrait featuring bold orange and cobalt blue tones, symbolizing warmth and endurance.",
        "file": "art_1.jpg",
        "pos": [-11.8, 1.6, -12.0],
        "rot": [0, math.pi / 2, 0],
        "width": 2.2,
        "height": 1.6
    },
    {
        "id": "art_2",
        "title": "Solar Harvest (حصاد الشمس)",
        "artist": "Contemporary Studio",
        "medium": "Mixed Media on Linen",
        "year": "2023",
        "description": "Luminous crimson and ochre hues capturing the heat and seasonal radiance of mountain terraces.",
        "file": "art_2.jpg",
        "pos": [-11.8, 1.6, -6.0],
        "rot": [0, math.pi / 2, 0],
        "width": 2.0,
        "height": 1.6
    },
    {
        "id": "art_3",
        "title": "Urban Echoes (أصداء المدن)",
        "artist": "Loft Atelier",
        "medium": "Charcoal and Acrylic",
        "year": "2022",
        "description": "Deep monochromatic architectural geometry reflecting historic urban fabric against the horizon.",
        "file": "art_3.jpg",
        "pos": [-11.8, 1.6, 0.0],
        "rot": [0, math.pi / 2, 0],
        "width": 2.0,
        "height": 1.6
    },
    {
        "id": "art_4",
        "title": "Terraced Slopes (مدرجات الجبال)",
        "artist": "Eco-Visionary Group",
        "medium": "Oil & Sand Pigments",
        "year": "2023",
        "description": "Steep agricultural contours rendered in emerald green and terraced stone textures celebrating indigenous hydrology.",
        "file": "art_4.jpg",
        "pos": [-11.8, 1.6, 6.0],
        "rot": [0, math.pi / 2, 0],
        "width": 2.2,
        "height": 1.6
    },
    {
        "id": "art_5",
        "title": "The Golden Cistern (البركة الذهبية)",
        "artist": "Heritage Guild",
        "medium": "Gold Leaf & Tempera",
        "year": "2021",
        "description": "Symbolic representation of traditional rainwater reservoirs with reflective gold leaf water ripples.",
        "file": "art_5.jpg",
        "pos": [-11.8, 1.6, 12.0],
        "rot": [0, math.pi / 2, 0],
        "width": 2.0,
        "height": 1.6
    },
    {
        "id": "art_6",
        "title": "Vernacular Horizon (أفق شبام)",
        "artist": "Group 4 Collective",
        "medium": "Raw Clay, Mud & Acrylic",
        "year": "2022",
        "description": "Towering mudbrick high-rises reaching toward twilight clouds, embodying five centuries of sustainable earthen engineering.",
        "file": "art_6.jpg",
        "pos": [11.8, 1.6, -12.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 2.2,
        "height": 1.6
    },
    {
        "id": "art_7",
        "title": "Flora of Socotra (أشجار دم الأخوين)",
        "artist": "Island Naturalists",
        "medium": "Botanical Gouache on Wood",
        "year": "2023",
        "description": "Dragon's Blood trees sheltering rare desert orchids under a starry celestial sky.",
        "file": "art_7.jpg",
        "pos": [11.8, 1.6, -6.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 2.2,
        "height": 1.6
    },
    {
        "id": "art_8",
        "title": "The Weaver's Loom (خيوط النول)",
        "artist": "Textile Masters",
        "medium": "Woven Fibers & Indigo",
        "year": "2022",
        "description": "Geometric textile rhythms paying homage to ancestral Zabid indigo and cotton dyeing craftsmanship.",
        "file": "art_8.jpg",
        "pos": [11.8, 1.6, 0.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 2.0,
        "height": 1.6
    },
    {
        "id": "art_9",
        "title": "Spate Streams (مواسم السيل)",
        "artist": "Hydrology Movement",
        "medium": "Fluid Acrylic & Resin",
        "year": "2024",
        "description": "Dynamic fluid cascades portraying flash flood diversion into desert fields with agricultural abundance.",
        "file": "art_9.jpg",
        "pos": [11.8, 1.6, 6.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 2.2,
        "height": 1.6
    },
    {
        "id": "art_10",
        "title": "The Peacebuilders (حوار الأجيال)",
        "artist": "Peace Arts Forum",
        "medium": "Oil on Canvas",
        "year": "2023",
        "description": "Elders and youth gathering beneath an ancient acacia tree, forging communal resilience and future vision.",
        "file": "art_10.jpg",
        "pos": [11.8, 1.6, 12.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 2.2,
        "height": 1.6
    },
    {
        "id": "art_11",
        "title": "Celestial Constellation (طوالع النجوم)",
        "artist": "Astronomical Society",
        "medium": "Lapis Lazuli & Gold Pigment",
        "year": "2023",
        "description": "The agricultural astronomical calendar of Suhail and Pleiades guiding planting and rainfall cycles.",
        "file": "art_11.jpg",
        "pos": [-3.0, 1.6, -19.8],
        "rot": [0, 0, 0],
        "width": 2.4,
        "height": 1.6
    },
    {
        "id": "art_12",
        "title": "Earthen Harmony (سيمفونية الطين)",
        "artist": "Group 4 Exhibit",
        "medium": "Mixed Clay & Silver Flake",
        "year": "2022",
        "description": "Central masterpiece of the Group 4 exhibition synthesizing vernacular architecture with modern spatial design.",
        "file": "art_12.jpg",
        "pos": [3.0, 1.6, -19.8],
        "rot": [0, 0, 0],
        "width": 2.4,
        "height": 1.6
    }
]

# Generate beautiful procedural artwork images
color_palettes = [
    [(240, 120, 40), (20, 60, 140), (250, 220, 80), (200, 50, 50)],   # art_1 Portrait
    [(220, 60, 40), (250, 180, 50), (140, 30, 20), (255, 230, 150)],  # art_2 Solar
    [(40, 40, 50), (180, 180, 190), (100, 110, 120), (230, 230, 235)],# art_3 Urban
    [(34, 139, 34), (107, 142, 35), (218, 165, 32), (85, 107, 47)],   # art_4 Terraces
    [(212, 175, 55), (30, 60, 90), (255, 215, 0), (70, 130, 180)],    # art_5 Gold
    [(180, 110, 60), (220, 170, 120), (90, 50, 25), (240, 210, 180)], # art_6 Shibam
    [(180, 40, 50), (46, 139, 87), (240, 200, 100), (25, 25, 112)],   # art_7 Socotra
    [(25, 25, 112), (70, 130, 180), (245, 245, 220), (178, 34, 34)],  # art_8 Weaver
    [(0, 119, 182), (72, 202, 228), (2, 62, 125), (202, 240, 248)],   # art_9 Spate
    [(140, 70, 40), (210, 140, 80), (60, 120, 80), (245, 225, 180)],  # art_10 Peace
    [(15, 23, 42), (59, 130, 246), (234, 179, 8), (147, 197, 253)],   # art_11 Stars
    [(160, 82, 45), (205, 133, 63), (245, 222, 179), (192, 192, 192)] # art_12 Harmony
]

for idx, art in enumerate(artworks_data):
    w, h = 800, 600
    img = Image.new("RGB", (w, h), (250, 250, 250))
    d = ImageDraw.Draw(img)
    pal = color_palettes[idx]
    
    # Background gradient / base
    for y in range(h):
        r = int(pal[0][0] + (pal[1][0] - pal[0][0]) * (y / h))
        g = int(pal[0][1] + (pal[1][1] - pal[0][1]) * (y / h))
        b = int(pal[0][2] + (pal[1][2] - pal[0][2]) * (y / h))
        d.line([(0, y), (w, y)], fill=(r, g, b))
    
    # Artistic shapes & painterly brush strokes
    for i in range(12):
        bx = int((i * 73) % w)
        by = int((i * 97) % h)
        rad = int(60 + (i * 29) % 180)
        c = pal[(i + 2) % len(pal)]
        d.ellipse([bx - rad, by - rad, bx + rad, by + rad], fill=c)
        d.polygon([
            (bx, by - rad),
            (bx + rad, by + rad),
            (bx - rad, by + int(rad * 0.8))
        ], fill=pal[(i + 1) % len(pal)])
    
    # Texture filter for fine canvas feel
    img = img.filter(ImageFilter.SMOOTH_MORE)
    
    # Elegant inner border & signature
    d.rectangle([20, 20, w - 20, h - 20], outline=(255, 255, 255, 180), width=4)
    d.text((40, h - 50), f"{art['title']}", fill=(255, 255, 255))
    d.text((40, h - 35), f"{art['artist']} ({art['year']})", fill=(230, 230, 230))
    
    save_path = os.path.join(art_dir, art["file"])
    img.save(save_path, quality=92)
    print(f"Saved {art['file']}")

with open(os.path.join(out_dir, "artworks_manifest.json"), "w", encoding="utf-8") as f:
    json.dump(artworks_data, f, indent=2, ensure_ascii=False)

print("Artworks manifest generated with 12 pieces.")
