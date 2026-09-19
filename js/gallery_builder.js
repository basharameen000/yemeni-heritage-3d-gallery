/**
 * Authentic Ancient Yemeni Gallery & Heritage Diwan Builder
 * (الصالة والمعرض التراثي اليمني القديم - محاكاة حية متكاملة لبيئة الحجر والمفرج)
 */

class GalleryBuilder {
  constructor(scene, artworksManifest) {
    this.scene = scene;
    this.artworks = artworksManifest || [];
    this.colliders = [];
    this.interactableArtworks = [];
    this.textureLoader = new THREE.TextureLoader();
  }

  build() {
    this.buildStoneArchitecture();
    this.buildTimberCeiling();
    this.buildStoneArcadeArches();
    this.buildUpperSanaaniDiwan();
    this.buildStaircase();
    this.buildLightingAndGodRays();
    this.buildHeritageProps(); // Tannour, Reha Mill, Pottery, Woven Plates & Mats
    this.buildArtworks();
    return {
      colliders: this.colliders,
      interactableArtworks: this.interactableArtworks
    };
  }

  buildStoneArchitecture() {
    // 1. Weathered Flagstone Floor (أرضية الحجر البازلتي العتيق)
    const floorTexture = this.textureLoader.load('assets/ancient_flagstone_floor.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 16);

    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.85,
      metalness: 0.05,
      color: 0x9e958b
    });

    const floorGeo = new THREE.PlaneGeometry(24, 40);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // 2. Ancient Basalt/Limestone Stone Masonry Walls (جدران حجر الحبش والبلق العتيق)
    const stoneWallTexture = this.textureLoader.load('assets/ancient_stone_wall.jpg');
    stoneWallTexture.wrapS = THREE.RepeatWrapping;
    stoneWallTexture.wrapT = THREE.RepeatWrapping;
    stoneWallTexture.repeat.set(8, 3);

    const wallMat = new THREE.MeshStandardMaterial({
      map: stoneWallTexture,
      roughness: 0.92,
      metalness: 0.02
    });

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.5, 40), wallMat);
    leftWall.position.set(-12, 4.25, 0);
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.5, 40), wallMat);
    rightWall.position.set(12, 4.25, 0);
    rightWall.receiveShadow = true;
    this.scene.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(24, 8.5, 0.5), wallMat);
    backWall.position.set(0, 4.25, -20);
    backWall.receiveShadow = true;
    this.scene.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Front Wall with arched entrance
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(9, 8.5, 0.5), wallMat);
    frontWallLeft.position.set(-7.5, 4.25, 20);
    this.scene.add(frontWallLeft);
    this.colliders.push(new THREE.Box3().setFromObject(frontWallLeft));

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(9, 8.5, 0.5), wallMat);
    frontWallRight.position.set(7.5, 4.25, 20);
    this.scene.add(frontWallRight);
    this.colliders.push(new THREE.Box3().setFromObject(frontWallRight));

    const frontWallHeader = new THREE.Mesh(new THREE.BoxGeometry(6, 3.5, 0.5), wallMat);
    frontWallHeader.position.set(0, 6.75, 20);
    this.scene.add(frontWallHeader);

    // Stone Recessed Niches (الروازين الحجرية في الحوائط)
    this.buildStoneNiches(wallMat);
  }

  buildStoneNiches(wallMat) {
    const nicheMat = new THREE.MeshStandardMaterial({ color: 0x3d3834, roughness: 0.95 });
    const nichePositions = [
      [-11.75, 2.4, -14],
      [-11.75, 2.4, -2],
      [-11.75, 2.4, 10],
      [11.75, 2.4, -14],
      [11.75, 2.4, -2],
      [11.75, 2.4, 10]
    ];

    nichePositions.forEach(([x, y, z]) => {
      // Recessed back
      const niche = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 1.8), nicheMat);
      niche.position.set(x, y, z);
      this.scene.add(niche);

      // Stone sill shelf
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.08, 2.0),
        new THREE.MeshStandardMaterial({ color: 0x5a524a, roughness: 0.9 })
      );
      shelf.position.set(x * 0.98, y - 0.6, z);
      this.scene.add(shelf);
    });
  }

  buildTimberCeiling() {
    // Heavy Rustic Timber Trunk Ceiling (سقف عوارض جذوع السدر المتراصة)
    const timberTexture = this.textureLoader.load('assets/rustic_timber_ceiling.jpg');
    timberTexture.wrapS = THREE.RepeatWrapping;
    timberTexture.wrapT = THREE.RepeatWrapping;
    timberTexture.repeat.set(12, 16);

    const ceilingMat = new THREE.MeshStandardMaterial({
      map: timberTexture,
      roughness: 0.88,
      metalness: 0.05
    });

    const ceilingGeo = new THREE.PlaneGeometry(24, 40);
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = 8.5;
    ceiling.rotation.x = Math.PI / 2;
    this.scene.add(ceiling);

    // Exposed Heavy Round Timber Beams running across the hall
    const logMat = new THREE.MeshStandardMaterial({
      color: 0x3a281c,
      roughness: 0.9
    });
    for (let z = -18; z <= 18; z += 4) {
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 24, 12), logMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.set(0, 8.3, z);
      this.scene.add(beam);
    }
  }

  buildStoneArcadeArches() {
    // Massive Stone Pillars and Semicircular Arches (العقود الحجرية من الصورة 1)
    const stoneColTexture = this.textureLoader.load('assets/ancient_stone_wall.jpg');
    stoneColTexture.wrapS = THREE.RepeatWrapping;
    stoneColTexture.repeat.set(1, 4);

    const stoneColMat = new THREE.MeshStandardMaterial({
      map: stoneColTexture,
      roughness: 0.92,
      color: 0xb5aa9c
    });

    const xPositions = [-4.0, 4.0];
    const zPillars = [-14, -6, 2, 10, 18];

    xPositions.forEach(x => {
      // 1. Massive Square Stone Pillars
      zPillars.forEach(z => {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 7.5, 1.1), stoneColMat);
        pillar.position.set(x, 3.75, z);
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        this.scene.add(pillar);
        this.colliders.push(new THREE.Box3().setFromObject(pillar));

        // Carved Stone Capital (تاج العمود المنحوت)
        const capital = new THREE.Mesh(
          new THREE.BoxGeometry(1.35, 0.45, 1.35),
          new THREE.MeshStandardMaterial({ color: 0x7c7368, roughness: 0.95 })
        );
        capital.position.set(x, 7.5, z);
        capital.castShadow = true;
        this.scene.add(capital);
      });

      // 2. Semicircular Masonry Arches between pillars
      for (let i = 0; i < zPillars.length - 1; i++) {
        const zMid = (zPillars[i] + zPillars[i + 1]) / 2;
        const archSpan = Math.abs(zPillars[i + 1] - zPillars[i]);

        // Horizontal stone arch beam
        const archBeam = new THREE.Mesh(
          new THREE.BoxGeometry(0.7, 0.7, archSpan),
          stoneColMat
        );
        archBeam.position.set(x, 7.85, zMid);
        this.scene.add(archBeam);

        // Curved arch rib
        const archCurv = new THREE.Mesh(
          new THREE.CylinderGeometry(archSpan / 2 - 0.4, archSpan / 2 - 0.4, 0.6, 20, 1, true, 0, Math.PI),
          stoneColMat
        );
        archCurv.position.set(x, 7.45, zMid);
        archCurv.rotation.x = Math.PI / 2;
        archCurv.rotation.z = Math.PI / 2;
        this.scene.add(archCurv);
      }
    });
  }

  buildUpperSanaaniDiwan() {
    // Upper Mezzanine transformed into Grand Sanaani Diwan (المفرج والديوان الصنعاني من الصورة 2)
    const diwanFloorMat = new THREE.MeshStandardMaterial({
      color: 0x5a4838,
      roughness: 0.8
    });
    const diwanFloor = new THREE.Mesh(new THREE.BoxGeometry(8, 0.35, 40), diwanFloorMat);
    diwanFloor.position.set(8, 3.8, 0);
    diwanFloor.receiveShadow = true;
    this.scene.add(diwanFloor);
    this.colliders.push(new THREE.Box3().setFromObject(diwanFloor));

    // Carved Timber Balustrade with Mashrabiya
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.75 });
    const balustradeRail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 40), woodMat);
    balustradeRail.position.set(4.0, 4.9, 0);
    this.scene.add(balustradeRail);

    for (let z = -19; z <= 19; z += 0.75) {
      const baluster = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.85, 8), woodMat);
      baluster.position.set(4.0, 4.45, z);
      this.scene.add(baluster);
    }

    // 1. Traditional Yemeni Kelim Rugs across the Diwan Floor
    const rugTexture = this.textureLoader.load('assets/yemeni_kelim_rug.jpg');
    const rugMat = new THREE.MeshStandardMaterial({ map: rugTexture, roughness: 0.85 });

    for (let z = -15; z <= 15; z += 6) {
      const rug = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.2), rugMat);
      rug.rotation.x = -Math.PI / 2;
      rug.position.set(8.5, 3.99, z);
      this.scene.add(rug);

      // Floor Cushions & Backrests (المساند والتكايات المطرزة)
      this.buildDiwanCushions(8.5, 4.02, z);
    }

    // 2. Towering Double-Tier Qamariyah Stained-Glass Windows along Upper Wall
    this.buildToweringQamariyahs();

    // 3. Hanging Bunches of Dried Aromatic Herbs (حزم الشذاب والريحان والبردقوش المعلقة)
    this.buildAromaticHerbs();

    // 4. Traditional Brass Hookah (المداعة اليمنية النحاسية)
    this.buildYemeniMadaha(8.5, 4.0, 0);
  }

  buildDiwanCushions(baseX, baseY, baseZ) {
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0x9e2a2b, roughness: 0.7 });
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0x223355, roughness: 0.75 });

    // Long floor mattress (الطراحة)
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.15, 1.2), cushionMat);
    mattress.position.set(baseX, baseY + 0.08, baseZ);
    this.scene.add(mattress);

    // Triangular backrest cushions (المتاكي)
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.35), pillowMat);
      backrest.position.set(baseX + 1.2, baseY + 0.3, baseZ + i * 0.3);
      this.scene.add(backrest);
    }
  }

  buildToweringQamariyahs() {
    const qamTexture = this.textureLoader.load('assets/qamariyah.png');
    const qamMat = new THREE.MeshStandardMaterial({
      map: qamTexture,
      transparent: true,
      roughness: 0.15,
      emissive: 0xffffff,
      emissiveMap: qamTexture,
      emissiveIntensity: 0.75,
      side: THREE.DoubleSide
    });

    // Full wall of glowing stained glass on the right and rear
    const zPositions = [-14, -7, 0, 7, 14];
    zPositions.forEach(z => {
      const qam = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.1), qamMat);
      qam.position.set(11.75, 6.4, z);
      qam.rotation.y = -Math.PI / 2;
      this.scene.add(qam);

      // Glowing point light
      const qamLight = new THREE.PointLight(0x38bdf8, 1.4, 14, 1.6);
      qamLight.position.set(10.5, 6.4, z);
      this.scene.add(qamLight);
    });

    // Grand Sanaa Qamariyah on Back Wall
    const grandQam = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 3.2), qamMat);
    grandQam.position.set(0, 6.4, -19.75);
    this.scene.add(grandQam);
  }

  buildAromaticHerbs() {
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x3d5a32, roughness: 0.9 });
    const stringMat = new THREE.MeshStandardMaterial({ color: 0xc4a472 });

    for (let z = -16; z <= 16; z += 4) {
      const herbGroup = new THREE.Group();
      herbGroup.position.set(11.6, 5.5, z);

      // Hanging twine
      const twine = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.8), stringMat);
      twine.position.y = 0.4;
      herbGroup.add(twine);

      // Dried bundle (الشذاب / الريحان)
      const bundle = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 6), herbMat);
      bundle.rotation.x = Math.PI;
      herbGroup.add(bundle);

      this.scene.add(herbGroup);
    }
  }

  buildYemeniMadaha(x, y, z) {
    // Traditional Brass Hookah (المداعة اليمنية)
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.2
    });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x422213, roughness: 0.7 });

    const madahaGroup = new THREE.Group();
    madahaGroup.position.set(x, y, z);

    // Brass base water vase
    const baseVase = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), brassMat);
    baseVase.position.y = 0.2;
    baseVase.scale.set(1, 1.3, 1);
    madahaGroup.add(baseVase);

    // Long brass neck stem
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 8), brassMat);
    stem.position.y = 0.65;
    madahaGroup.add(stem);

    // Top clay/brass bowl
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.03, 0.12, 8), woodMat);
    bowl.position.y = 1.0;
    madahaGroup.add(bowl);

    this.scene.add(madahaGroup);
  }

  buildStaircase() {
    // Stone & Teak Wood Ancient Steps
    const stoneStepMat = new THREE.MeshStandardMaterial({ color: 0x48423c, roughness: 0.9 });
    const woodTreadMat = new THREE.MeshStandardMaterial({ color: 0x4a2a16, roughness: 0.5 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1c, metalness: 0.8, roughness: 0.5 });

    const stepCount = 20;
    const startZ = 4.0;
    const endZ = -6.0;
    const targetY = 3.8;
    const startX = -6.8;

    for (let i = 0; i < stepCount; i++) {
      const progress = i / stepCount;
      const y = progress * targetY;
      const z = startZ + progress * (endZ - startZ);

      // Stone riser base
      const riser = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.55), stoneStepMat);
      riser.position.set(startX, y + 0.06, z);
      riser.receiveShadow = true;
      riser.castShadow = true;
      this.scene.add(riser);

      // Teak wood tread
      const tread = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.58), woodTreadMat);
      tread.position.set(startX, y + 0.14, z);
      this.scene.add(tread);

      // Forged iron baluster
      const baluster = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0), ironMat);
      baluster.position.set(startX + 0.85, y + 0.6, z);
      this.scene.add(baluster);
    }

    const railLength = Math.sqrt(Math.pow(endZ - startZ, 2) + Math.pow(targetY, 2));
    const angle = Math.atan2(targetY, -(endZ - startZ));
    const handrailGeo = new THREE.CylinderGeometry(0.035, 0.035, railLength, 8);
    const handrail = new THREE.Mesh(handrailGeo, ironMat);
    handrail.position.set(startX + 0.85, targetY / 2 + 0.95, (startZ + endZ) / 2);
    handrail.rotation.x = angle;
    this.scene.add(handrail);
  }

  buildLightingAndGodRays() {
    // Warm Ambient Light (Lantern & Hearth Ambience)
    const ambientLight = new THREE.AmbientLight(0xffeed6, 0.42);
    this.scene.add(ambientLight);

    // Primary Golden Sunlight
    const sunLight = new THREE.DirectionalLight(0xfffae3, 1.45);
    sunLight.position.set(-8, 16, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0003;
    this.scene.add(sunLight);

    // 1. High Clerestory Windows with Volumetric God Rays (أشعة الشمس الحجمية من الصورة 1)
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xfff6cf,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    for (let z = -12; z <= 12; z += 8) {
      // Clerestory stone window opening
      const windowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.6),
        new THREE.MeshBasicMaterial({ color: 0xfffbee })
      );
      windowMesh.position.set(-11.75, 7.0, z);
      windowMesh.rotation.y = Math.PI / 2;
      this.scene.add(windowMesh);

      // Angled Volumetric Sunbeam Shaft
      const rayCone = new THREE.ConeGeometry(3.5, 12, 16, 1, true);
      const rayMesh = new THREE.Mesh(rayCone, rayMat);
      rayMesh.position.set(-6.0, 3.5, z);
      rayMesh.rotation.z = Math.PI / 4;
      this.scene.add(rayMesh);
    }
  }

  buildHeritageProps() {
    // 1. Woven Palm Leaf Mats on Flagstone Floor (حصر سعف النخيل المفرودة)
    const matTexture = this.textureLoader.load('assets/woven_palm_mat.jpg');
    matTexture.wrapS = THREE.RepeatWrapping;
    matTexture.wrapT = THREE.RepeatWrapping;
    matTexture.repeat.set(4, 3);

    const matMaterial = new THREE.MeshStandardMaterial({
      map: matTexture,
      roughness: 0.9,
      color: 0xe0c8a8
    });

    const matPositions = [
      { x: 0, z: 12, w: 4.5, h: 3.5 },
      { x: 0, z: 4, w: 4.5, h: 3.5 },
      { x: 0, z: -4, w: 4.5, h: 3.5 },
      { x: 0, z: -12, w: 4.5, h: 3.5 },
      { x: -6.5, z: 2, w: 3.2, h: 2.5 },
      { x: -6.5, z: -6, w: 3.2, h: 2.5 }
    ];

    matPositions.forEach(p => {
      const matMesh = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.h), matMaterial);
      matMesh.rotation.x = -Math.PI / 2;
      matMesh.position.set(p.x, 0.02, p.z);
      matMesh.receiveShadow = true;
      this.scene.add(matMesh);
    });

    // 2. Circular Woven Palm Plates / Trays (المناسف والمصارف الخوصية المعلقة والمسندة)
    const plateTexture = this.textureLoader.load('assets/woven_palm_plate.png');
    const plateMat = new THREE.MeshStandardMaterial({
      map: plateTexture,
      transparent: true,
      roughness: 0.85
    });

    // Plates leaning against columns and on walls
    const plateConfigs = [
      { pos: [-3.3, 0.9, -6], rot: [0, Math.PI / 4, 0.2], s: 1.8 },
      { pos: [3.3, 0.9, -6], rot: [0, -Math.PI / 4, -0.2], s: 1.8 },
      { pos: [-3.3, 0.9, 10], rot: [0, Math.PI / 4, 0.2], s: 1.6 },
      { pos: [-11.6, 1.8, -18], rot: [0, Math.PI / 2, 0], s: 2.2 },
      { pos: [11.6, 1.8, -18], rot: [0, -Math.PI / 2, 0], s: 2.2 }
    ];

    plateConfigs.forEach(cfg => {
      const plate = new THREE.Mesh(new THREE.CircleGeometry(cfg.s / 2, 24), plateMat);
      plate.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      plate.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      plate.castShadow = true;
      this.scene.add(plate);
    });

    // 3. The Earthen Tannour & Golden Wheat Sheaf Corner (ركن التنور الطيني والضمة من الصورة 1)
    this.buildTannourAndWheat();

    // 4. The Basalt Stone Grain Mill (الرحى الحجرية البازلتية من الصورة 1)
    this.buildBasaltRehaMill();

    // 5. Terracotta Pottery Jars & Amphoras (الجرار والأواني الفخارية)
    this.buildTerracottaPottery();

    // 6. Traditional Wall Kerosene Lamps (فوانيس وسرج القاز الجدارية)
    this.buildKeroseneLamps();
  }

  buildTannourAndWheat() {
    const clayMat = new THREE.MeshStandardMaterial({ color: 0x9c6644, roughness: 0.95 });
    const wheatMat = new THREE.MeshStandardMaterial({ color: 0xddb855, roughness: 0.8 });

    const tannourGroup = new THREE.Group();
    tannourGroup.position.set(-10.2, 0, -17.5);

    // Earthen base platform
    const platform = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 2.4), clayMat);
    platform.position.y = 0.225;
    tannourGroup.add(platform);

    // Domed clay tannour
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7),
      clayMat
    );
    dome.position.y = 0.45;
    dome.castShadow = true;
    tannourGroup.add(dome);

    // Fire opening mouth
    const fireMouth = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.4, 16),
      new THREE.MeshBasicMaterial({ color: 0x1f140e })
    );
    fireMouth.position.set(0, 0.85, 0.4);
    fireMouth.rotation.x = Math.PI / 4;
    tannourGroup.add(fireMouth);

    // Warm fire glow inside
    const fireLight = new THREE.PointLight(0xff5500, 1.2, 5);
    fireLight.position.set(0, 0.7, 0.3);
    tannourGroup.add(fireLight);

    // Golden Wheat Sheaf (ضمة سنابل القمح الذهبية المربوطة)
    const sheaf = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 1.4, 12), wheatMat);
    sheaf.position.set(-1.4, 0.7, 0.3);
    sheaf.rotation.z = 0.15;
    sheaf.castShadow = true;
    tannourGroup.add(sheaf);

    this.scene.add(tannourGroup);
    this.colliders.push(new THREE.Box3().setFromObject(tannourGroup));
  }

  buildBasaltRehaMill() {
    // The Basalt Stone Mill (الرحى الحجرية لطحن الحبوب من الصورة 1)
    const basaltMat = new THREE.MeshStandardMaterial({ color: 0x383533, roughness: 0.95 });
    const woodBaseMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.8 });

    const rehaGroup = new THREE.Group();
    rehaGroup.position.set(-6.5, 0, -14.0);

    // Wooden four-legged trestle
    const trestle = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 1.4), woodBaseMat);
    trestle.position.y = 0.125;
    rehaGroup.add(trestle);

    // Lower basalt millstone (حجر الرحى السفلي)
    const lowerStone = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.15, 24), basaltMat);
    lowerStone.position.y = 0.325;
    lowerStone.castShadow = true;
    rehaGroup.add(lowerStone);

    // Upper basalt millstone (حجر الرحى العلوي)
    const upperStone = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.15, 24), basaltMat);
    upperStone.position.y = 0.475;
    upperStone.castShadow = true;
    rehaGroup.add(upperStone);

    // Wooden turning stick (يد الرحى)
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8),
      new THREE.MeshStandardMaterial({ color: 0xc49a45 })
    );
    handle.position.set(0.35, 0.75, 0);
    rehaGroup.add(handle);

    this.scene.add(rehaGroup);
    this.colliders.push(new THREE.Box3().setFromObject(rehaGroup));
  }

  buildTerracottaPottery() {
    // Traditional Terracotta Amphoras & Water Pitchers (الزير، الشربة، الحيسية)
    const clayMat = new THREE.MeshStandardMaterial({
      color: 0xb25d3a, // Terracotta earthenware
      roughness: 0.88
    });

    const potPositions = [
      // Floor corners
      [-10.8, 0, 18],
      [10.8, 0, 18],
      [10.8, 0, -17],
      // In wall niches
      [-11.5, 1.85, -14],
      [-11.5, 1.85, -2],
      [-11.5, 1.85, 10],
      [11.5, 1.85, -14],
      [11.5, 1.85, -2]
    ];

    potPositions.forEach(([x, y, z]) => {
      const potGroup = new THREE.Group();
      potGroup.position.set(x, y, z);

      // Bulbous body
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), clayMat);
      body.position.y = 0.4;
      body.scale.set(1, 1.3, 1);
      body.castShadow = true;
      potGroup.add(body);

      // Narrow neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.3, 12), clayMat);
      neck.position.y = 0.85;
      potGroup.add(neck);

      // Flared rim
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 8, 16), clayMat);
      rim.position.y = 1.0;
      rim.rotation.x = Math.PI / 2;
      potGroup.add(rim);

      this.scene.add(potGroup);
    });
  }

  buildKeroseneLamps() {
    // Wall-mounted Kerosene Lamps (فوانيس وسرج القاز الجدارية)
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2e, metalness: 0.85 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1
    });

    const lampPositions = [
      [-11.6, 3.2, -8],
      [-11.6, 3.2, 4],
      [11.6, 3.2, -8],
      [11.6, 3.2, 4],
      [-3.4, 3.5, 2],
      [3.4, 3.5, 2]
    ];

    lampPositions.forEach(([x, y, z]) => {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(x, y, z);

      // Metal bracket & oil tank
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.15, 12), metalMat);
      lampGroup.add(base);

      // Glass chimney
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.35, 12), glassMat);
      chimney.position.y = 0.25;
      lampGroup.add(chimney);

      // Golden flickering flame light
      const flame = new THREE.PointLight(0xffa500, 0.9, 7);
      flame.position.y = 0.25;
      lampGroup.add(flame);

      this.scene.add(lampGroup);
    });
  }

  buildArtworks() {
    // Artworks Framed in Rustic Weathered Dark Wood (إطارات خشبية عتيقة)
    const frameWoodMat = new THREE.MeshStandardMaterial({
      color: 0x302115,
      roughness: 0.8
    });

    const mattingMat = new THREE.MeshStandardMaterial({
      color: 0xf5f0e6,
      roughness: 0.95
    });

    this.artworks.forEach((art) => {
      const artGroup = new THREE.Group();
      artGroup.position.set(art.pos[0], art.pos[1], art.pos[2]);
      artGroup.rotation.set(art.rot[0], art.rot[1], art.rot[2]);

      const w = art.width;
      const h = art.height;
      const frameThickness = 0.14;
      const frameDepth = 0.09;

      // 1. Rustic Wood Frame
      const frameMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w + frameThickness * 2, h + frameThickness * 2, frameDepth),
        frameWoodMat
      );
      frameMesh.castShadow = true;
      artGroup.add(frameMesh);

      // 2. Beveled Matting
      const mattingMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w + 0.08, h + 0.08),
        mattingMat
      );
      mattingMesh.position.z = frameDepth / 2 + 0.005;
      artGroup.add(mattingMesh);

      // 3. Canvas
      const filePath = art.file.startsWith('photo/') || art.file.startsWith('assets/') ? art.file : `assets/artworks/${art.file}`;
      const texture = this.textureLoader.load(filePath);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      const canvasMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.45
      });

      const canvasMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), canvasMat);
      canvasMesh.position.z = frameDepth / 2 + 0.01;
      canvasMesh.userData = { artworkData: art };
      artGroup.add(canvasMesh);

      // 4. Antiqued Brass Placard
      const placardMat = new THREE.MeshStandardMaterial({
        color: 0xc89b3c,
        metalness: 0.8,
        roughness: 0.35
      });
      const placard = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.02), placardMat);
      placard.position.set(0, -h / 2 - 0.22, frameDepth / 2);
      artGroup.add(placard);

      this.scene.add(artGroup);
      this.interactableArtworks.push(canvasMesh);
    });
  }
}

window.GalleryBuilder = GalleryBuilder;
