import json
import os
import math

manifest_path = r"C:\Users\Bashar\.gemini\antigravity\scratch\group4_virtual_gallery\assets\artworks_manifest.json"

artworks = [
    # Left Stone Wall (5 Grand Large-scale Artworks)
    {
        "id": "photo_1",
        "title": "المزارع اليماني وبذر الأمل (The Yemeni Farmer Sowing Life)",
        "artist": "توثيق التراث الحي (Living Heritage Photography)",
        "medium": "تصوير وثائقي فائق الدقة (8K Documentary Photo)",
        "year": "2024",
        "description": "مشهد ملحمي يجسد كفاح المزارع اليمني وهو ينثر بذور القمح والذرة في الأرض الطيبة، مبرزاً أسرار التكيف الزراعي والتضامن مع الأرض.",
        "file": "photo/ultra-realistic-8k-photo-of-yemeni-farmer-spreadin.jpg",
        "pos": [-11.75, 2.35, -14.0],
        "rot": [0, math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_2",
        "title": "حبات سنابل الغلال اليمانية (Yemeni Traditional Grains & Harvest)",
        "artist": "أرشيف الأمن الغذائي التراثي (Food Heritage Archive)",
        "medium": "تصوير وثائقي فوتوغرافي (8K Ultra-Detailed Macro)",
        "year": "2024",
        "description": "تفاصيل دقيقة لمحاصيل الحبوب اليمنية الأصيلة المحصودة محلياً، التي حافظت على الأمن الغذائي عبر القرون دون أسمدة كيميائية.",
        "file": "photo/ultra-realistic-8k-photo-of-traditional-yemeni-gra.jpg",
        "pos": [-11.75, 2.35, -7.0],
        "rot": [0, math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_3",
        "title": "الزراعة العضوية والمدرجات الجبلية (Traditional Organic Terraces)",
        "artist": "عدسة البيئة والتنمية (Eco-Heritage Photography)",
        "medium": "لوحة فوتوغرافية سينمائية (Cinematic 8K)",
        "year": "2024",
        "description": "توثيق لأساليب الزراعة العضوية اليمنية في المدرجات الجبلية العريقة وهندسة حفظ مياه الأمطار والتربة.",
        "file": "photo/ultra-realistic-8k-photo-of-traditional-yemeni-org.jpg",
        "pos": [-11.75, 2.35, 0.0],
        "rot": [0, math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_4",
        "title": "المائدة والخبز البلدي التراثي (Traditional Yemeni Bread & Sustenance)",
        "artist": "سلسلة تقاليد الغذاء (Traditional Culinary Series)",
        "medium": "تصوير وثائقي واقعي (High-Res 8K Photo)",
        "year": "2024",
        "description": "خبز التنور البلدي والمائدة اليمنية التقليدية المحضرة بالحبوب الكاملة وأواني الفخار الحجرية العتيقة.",
        "file": "photo/ultra-realistic-8k-photo-of-yemeni-traditional-foo.jpg",
        "pos": [-11.75, 2.35, 7.0],
        "rot": [0, math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_5",
        "title": "ذاكرة الأرض والقرى التاريخية (Documentary Heritage of Yemen)",
        "artist": "مشروع حماية التراث اليمني (Yemen Heritage Protection)",
        "medium": "لوحة وثائقية بانورامية (8K Panoramic Documentary)",
        "year": "2023",
        "description": "لقطة وثائقية تاريخية تسرد حكاية الاستدامة العمرانية والتعايش الإنساني مع قمم الجبال اليمنية الوعرة.",
        "file": "photo/ultra-realistic-8k-documentary-photo-of-traditiona.jpg",
        "pos": [-11.75, 2.35, 14.0],
        "rot": [0, math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },

    # Grand Back Wall Centerpiece (Square Monumental Masterpiece directly under Grand Qamariyah)
    {
        "id": "photo_6",
        "title": "ملامح الحكمة اليمانية (Portrait of Ancient Wisdom)",
        "artist": "روائع الفن التشكيلي المعاصر (Hyperrealistic Masters)",
        "medium": "رسم زيتي واقعي فائق الدقة (Hyperrealistic Oil on Canvas)",
        "year": "2024",
        "description": "لوحة بورتريه أسطورية مربعة ضخمة تحكي تجاعيدها وقسماتها الصامدة تاريخ حكمة وشجاعة الإنسان اليمني عبر الأجيال.",
        "file": "photo/hyperrealistic-oil-painting-extreme-detail-old-yem.jpg",
        "pos": [0.0, 2.4, -19.75],
        "rot": [0, 0, 0],
        "width": 3.2,
        "height": 3.2
    },

    # Right Stone Wall (5 Grand Large-scale Artworks)
    {
        "id": "photo_7",
        "title": "سيدات تعز وحصاد الخير (Women of Taiz - Heritage & Grace)",
        "artist": "استوديو التراث الإنساني (Humanitarian Lens Taiz)",
        "medium": "تصوير واقعي احترافي (Photorealistic 8K Fine Art)",
        "year": "2024",
        "description": "لوحة فوتوغرافية بديعة تبرز نساء تعز بالزي التراثي الأصيل، يجسدن الصمود والعمل الميداني والبهجة رغم التحديات.",
        "file": "photo/photorealism-yemeni-women-from-taiz-carrying-yello.jpg",
        "pos": [11.75, 2.35, -14.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_8",
        "title": "الأصالة التعزية والتطريز التراثي (Taiz Traditional Elegance)",
        "artist": "معرض الأزياء التراثية (Yemeni Folk Costume Gallery)",
        "medium": "بورتريه فوتوغرافي وثائقي (Documentary Portrait)",
        "year": "2024",
        "description": "توثيق رائع للثوب التعزي التقليدي بتطريزاته الفريدة وألوانه الزاهية التي تعكس هوية وبراعة المرأة اليمنية في الغزل والتطريز.",
        "file": "photo/simple-realistic-photo-of-yemeni-woman-in-taiz-tra.jpg",
        "pos": [11.75, 2.35, -7.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_9",
        "title": "الأم اليمنية وروح الصمود (The Yemeni Matriarch - Spirit of Resilience)",
        "artist": "عدسة الصمود الإنساني (Resilience Visual Archive)",
        "medium": "تصوير وثائقي احترافي (8K Humanist Photography)",
        "year": "2024",
        "description": "بورتريه معبر يفيض بالحنان والعزيمة للأم اليمنية وهي تحافظ على شعلة الحياة وتماسك الأسرة والمجتمع.",
        "file": "photo/ultra-realistic-8k-photo-of-traditional-yemeni-wom.jpg",
        "pos": [11.75, 2.35, 0.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_10",
        "title": "أفق الصمود التعبيري (Expressionist Horizon & Blood Sky)",
        "artist": "التيار التعبيري الحديث (Yemeni Modern Expressionism)",
        "medium": "زيت على قماش خام (Oil on Heavy Linen)",
        "year": "2023",
        "description": "لوحة تعبيرية ثائرة بألوان حمراء ملتهبة وسماء دموية تفيض بالشجن، تتحدى الانكسار وتسطع ببريق الأمل الصامد.",
        "file": "photo/expressionism-oil-painting-red-blood-sky-bright-ye.jpg",
        "pos": [11.75, 2.35, 7.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    },
    {
        "id": "photo_11",
        "title": "مقارنة رمزية معاصرة (Contemporary Symbolic Harmony)",
        "artist": "المحترف التشكيلي اليمني (Yemeni Contemporary Studio)",
        "medium": "أكريليك ومواد مركبة (Mixed Media & Acrylic)",
        "year": "2024",
        "description": "عمل تركيبي رمزي يقارن بين التحديات المناخية والبيئية وبين طاقات الانبعاث والتجدد المستدام في المجتمع اليمني.",
        "file": "photo/contemporary-symbolic-painting-split-comparison-le.jpg",
        "pos": [11.75, 2.35, 14.0],
        "rot": [0, -math.pi / 2, 0],
        "width": 3.75,
        "height": 2.5
    }
]

with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(artworks, f, indent=2, ensure_ascii=False)

print(f"Manifest updated with {len(artworks)} GRAND-scale authentic user photos!")
