/**
 * Group 4 Virtual Gallery Application Entry Point
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('canvas-container');
  const blocker = document.getElementById('blocker');
  const btnAutopilot = document.getElementById('btn-autopilot');
  const btnAudio = document.getElementById('btn-audio');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const artworkModal = document.getElementById('artwork-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // 1. Setup Three.js Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1117);
  scene.fog = new THREE.FogExp2(0x0e1117, 0.015);

  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.65, 17); // Starting at atrium entrance

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // 2. Load Artworks Manifest
  let artworks = [];
  try {
    const res = await fetch('assets/artworks_manifest.json');
    artworks = await res.json();
  } catch (err) {
    console.error('Failed to load artworks manifest:', err);
  }

  // 3. Build Gallery Architecture
  const builder = new GalleryBuilder(scene, artworks);
  const { colliders, interactableArtworks } = builder.build();

  // 4. Modal Handler
  const showArtworkModal = (art) => {
    document.getElementById('modal-title').textContent = art.title;
    document.getElementById('modal-artist').textContent = `${art.artist} (${art.year})`;
    document.getElementById('modal-medium').textContent = art.medium;
    document.getElementById('modal-desc').textContent = art.description;
    const filePath = art.file.startsWith('photo/') || art.file.startsWith('assets/') ? art.file : `assets/artworks/${art.file}`;
    document.getElementById('modal-img').src = filePath;

    artworkModal.classList.add('active');
    controls.pointerLockControls.unlock();
  };

  modalCloseBtn.addEventListener('click', () => {
    artworkModal.classList.remove('active');
    controls.pointerLockControls.lock();
  });

  // 5. Initialize Controls
  const controls = new GalleryControls(
    camera,
    document.body,
    colliders,
    interactableArtworks,
    showArtworkModal
  );
  window.galleryApp = { camera, scene, controls, renderer };

  // Blocker / Start Screen Interaction
  blocker.addEventListener('click', () => {
    controls.pointerLockControls.lock();
    initAudio();
  });

  controls.pointerLockControls.addEventListener('lock', () => {
    blocker.style.display = 'none';
  });

  controls.pointerLockControls.addEventListener('unlock', () => {
    if (!artworkModal.classList.contains('active') && !controls.isAutopilot) {
      blocker.style.display = 'flex';
    }
  });

  // Autopilot Button
  btnAutopilot.addEventListener('click', () => {
    if (controls.isAutopilot) {
      controls.stopAutopilot();
      btnAutopilot.classList.remove('active');
      btnAutopilot.innerHTML = '<span>🎬</span> جولة تلقائية';
    } else {
      controls.startAutopilot();
      btnAutopilot.classList.add('active');
      btnAutopilot.innerHTML = '<span>⏸️</span> إيقاف الجولة';
      blocker.style.display = 'none';
      initAudio();
    }
  });

  // Fullscreen Button
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // 6. Audio Soundtrack
  let audio = new Audio('assets/piano_music.mp3');
  audio.loop = true;
  let isAudioPlaying = false;

  const initAudio = () => {
    if (!isAudioPlaying) {
      audio.play().then(() => {
        isAudioPlaying = true;
        btnAudio.innerHTML = '<span>🔊</span> الصوت: يعمل';
      }).catch(e => console.log('Audio autoplay prevented:', e));
    }
  };

  btnAudio.addEventListener('click', () => {
    if (isAudioPlaying) {
      audio.pause();
      isAudioPlaying = false;
      btnAudio.innerHTML = '<span>🔇</span> الصوت: مكتوم';
    } else {
      audio.play();
      isAudioPlaying = true;
      btnAudio.innerHTML = '<span>🔊</span> الصوت: يعمل';
    }
  });

  // 7. Minimap 2D HUD
  const minimapCanvas = document.getElementById('minimap-canvas');
  const mmCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;

  function updateMinimap() {
    if (!mmCtx) return;
    const w = minimapCanvas.width;
    const h = minimapCanvas.height;

    mmCtx.clearRect(0, 0, w, h);

    // Gallery Scale: 24m wide by 40m long -> map to canvas
    const scaleX = w / 26;
    const scaleY = h / 42;

    const toMapX = (x) => (x + 13) * scaleX;
    const toMapY = (z) => (z + 21) * scaleY;

    // Gallery Outer Walls
    mmCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    mmCtx.lineWidth = 2;
    mmCtx.strokeRect(toMapX(-12), toMapY(-20), 24 * scaleX, 40 * scaleY);

    // Mezzanine
    mmCtx.fillStyle = 'rgba(59, 130, 246, 0.15)';
    mmCtx.fillRect(toMapX(4), toMapY(-20), 8 * scaleX, 40 * scaleY);

    // Staircase
    mmCtx.fillStyle = 'rgba(212, 175, 55, 0.3)';
    mmCtx.fillRect(toMapX(-8), toMapY(-6), 2.5 * scaleX, 10 * scaleY);

    // Artworks markers
    artworks.forEach(art => {
      mmCtx.fillStyle = '#d4af37';
      mmCtx.beginPath();
      mmCtx.arc(toMapX(art.pos[0]), toMapY(art.pos[2]), 2.5, 0, Math.PI * 2);
      mmCtx.fill();
    });

    // Player Position & Direction Cone
    const px = toMapX(camera.position.x);
    const py = toMapY(camera.position.z);

    // Direction vector
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const angle = Math.atan2(dir.x, dir.z);

    mmCtx.save();
    mmCtx.translate(px, py);
    mmCtx.rotate(angle);

    // Sight cone
    mmCtx.fillStyle = 'rgba(212, 175, 55, 0.35)';
    mmCtx.beginPath();
    mmCtx.moveTo(0, 0);
    mmCtx.arc(0, 0, 16, Math.PI / 2 - 0.5, Math.PI / 2 + 0.5);
    mmCtx.fill();

    // Player Dot
    mmCtx.fillStyle = '#ef4444';
    mmCtx.beginPath();
    mmCtx.arc(0, 0, 4, 0, Math.PI * 2);
    mmCtx.fill();

    mmCtx.restore();
  }

  // 8. Render Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);

    controls.update(delta);
    updateMinimap();

    renderer.render(scene, camera);
  }

  animate();

  // 9. Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
