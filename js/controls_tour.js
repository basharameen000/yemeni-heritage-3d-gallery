/**
 * Controls, First-Person Navigation & Cinematic Autopilot Tour
 */

class GalleryControls {
  constructor(camera, domElement, colliders, interactableArtworks, onArtworkSelect) {
    this.camera = camera;
    this.domElement = domElement;
    this.colliders = colliders || [];
    this.interactables = interactableArtworks || [];
    this.onArtworkSelect = onArtworkSelect;

    this.pointerLockControls = new THREE.PointerLockControls(camera, domElement);

    // Movement Physics
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.isSprinting = false;

    this.playerHeight = 1.65;
    this.playerRadius = 0.5;

    // Raycaster for Hover & Selection
    this.raycaster = new THREE.Raycaster();
    this.mouseCenter = new THREE.Vector2(0, 0);
    this.hoveredArtwork = null;

    // Autopilot Tour State
    this.isAutopilot = false;
    this.tourSpline = null;
    this.tourProgress = 0;
    this.tourDuration = 90; // seconds for full tour
    this.isTourPaused = false;
    this.pauseTimer = 0;

    this.initEvents();
    this.initAutopilotSpline();
  }

  initEvents() {
    const onKeyDown = (e) => {
      if (this.isAutopilot) {
        if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
          this.stopAutopilot();
        }
      }
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW': this.moveForward = true; break;
        case 'ArrowLeft':
        case 'KeyA': this.moveLeft = true; break;
        case 'ArrowDown':
        case 'KeyS': this.moveBackward = true; break;
        case 'ArrowRight':
        case 'KeyD': this.moveRight = true; break;
        case 'ShiftLeft':
        case 'ShiftRight': this.isSprinting = true; break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW': this.moveForward = false; break;
        case 'ArrowLeft':
        case 'KeyA': this.moveLeft = false; break;
        case 'ArrowDown':
        case 'KeyS': this.moveBackward = false; break;
        case 'ArrowRight':
        case 'KeyD': this.moveRight = false; break;
        case 'ShiftLeft':
        case 'ShiftRight': this.isSprinting = false; break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Click to select artwork
    window.addEventListener('click', () => {
      if (this.pointerLockControls.isLocked && this.hoveredArtwork) {
        if (this.onArtworkSelect) {
          this.onArtworkSelect(this.hoveredArtwork.userData.artworkData);
        }
      }
    });
  }

  initAutopilotSpline() {
    // Elegant sweeping tour points starting at the atrium entrance
    const waypoints = [
      new THREE.Vector3(0, 1.65, 17),    // Entrance
      new THREE.Vector3(-3.5, 1.65, 12), // Toward left portraits
      new THREE.Vector3(-8.5, 1.65, 10), // Inspect art 5
      new THREE.Vector3(-8.5, 1.65, 3),  // Inspect art 4
      new THREE.Vector3(-8.5, 1.65, -4), // Inspect art 2
      new THREE.Vector3(-8.5, 1.65, -11),// Inspect art 1
      new THREE.Vector3(-4, 1.65, -16),  // Rear gallery left
      new THREE.Vector3(0, 1.65, -16),   // Centerpiece masterworks
      new THREE.Vector3(4, 1.65, -16),   // Rear gallery right
      new THREE.Vector3(8.5, 1.65, -11), // Inspect art 6
      new THREE.Vector3(8.5, 1.65, -4),  // Inspect art 7
      new THREE.Vector3(8.5, 1.65, 3),   // Inspect art 8
      new THREE.Vector3(8.5, 1.65, 10),  // Inspect art 10
      new THREE.Vector3(3.5, 1.65, 14),  // Center atrium sweep
      new THREE.Vector3(0, 1.65, 17)     // Loop back to start
    ];

    this.tourSpline = new THREE.CatmullRomCurve3(waypoints, true, 'catmullrom', 0.5);
  }

  startAutopilot() {
    this.isAutopilot = true;
    this.isTourPaused = false;
    this.tourProgress = 0;
    if (this.pointerLockControls.isLocked) {
      this.pointerLockControls.unlock();
    }
  }

  stopAutopilot() {
    this.isAutopilot = false;
  }

  update(delta) {
    if (this.isAutopilot) {
      this.updateAutopilot(delta);
    } else {
      this.updateFirstPerson(delta);
    }

    this.updateRaycasting();
  }

  updateFirstPerson(delta) {
    if (!this.pointerLockControls.isLocked) return;

    // Deceleration / friction
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    const speed = this.isSprinting ? 12.0 : 6.0;

    if (this.moveForward || this.moveBackward) {
      this.velocity.z -= this.direction.z * speed * 40.0 * delta;
    }
    if (this.moveLeft || this.moveRight) {
      this.velocity.x -= this.direction.x * speed * 40.0 * delta;
    }

    // Save current pos for collision rollback
    const oldX = this.camera.position.x;
    const oldZ = this.camera.position.z;

    // Move forward/back
    this.pointerLockControls.moveRight(-this.velocity.x * delta);
    this.pointerLockControls.moveForward(-this.velocity.z * delta);

    // Wall & Obstacle Collision Check
    const playerBox = new THREE.Box3();
    const pos = this.camera.position;
    playerBox.min.set(pos.x - this.playerRadius, 0, pos.z - this.playerRadius);
    playerBox.max.set(pos.x + this.playerRadius, 2.5, pos.z + this.playerRadius);

    for (let i = 0; i < this.colliders.length; i++) {
      if (playerBox.intersectsBox(this.colliders[i])) {
        // Rollback position to avoid penetrating walls
        this.camera.position.x = oldX;
        this.camera.position.z = oldZ;
        this.velocity.set(0, 0, 0);
        break;
      }
    }

    // Boundary constraints
    this.camera.position.x = Math.max(-11.0, Math.min(11.0, this.camera.position.x));
    this.camera.position.z = Math.max(-19.0, Math.min(19.0, this.camera.position.z));
    this.camera.position.y = this.playerHeight;
  }

  updateAutopilot(delta) {
    if (this.isTourPaused) {
      this.pauseTimer -= delta;
      if (this.pauseTimer <= 0) {
        this.isTourPaused = false;
      }
      return;
    }

    this.tourProgress += (delta / this.tourDuration);
    if (this.tourProgress >= 1.0) {
      this.tourProgress = 0;
    }

    // Current spline point
    const currentPoint = this.tourSpline.getPointAt(this.tourProgress);
    // Look ahead point for natural camera heading
    const lookAheadPoint = this.tourSpline.getPointAt((this.tourProgress + 0.03) % 1.0);

    this.camera.position.copy(currentPoint);
    this.camera.lookAt(lookAheadPoint.x, 1.6, lookAheadPoint.z);
  }

  updateRaycasting() {
    this.raycaster.setFromCamera(this.mouseCenter, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactables);

    const crosshair = document.getElementById('crosshair');

    if (intersects.length > 0 && intersects[0].distance < 7.0) {
      const hit = intersects[0].object;
      this.hoveredArtwork = hit;
      if (crosshair) crosshair.classList.add('hovering');
    } else {
      this.hoveredArtwork = null;
      if (crosshair) crosshair.classList.remove('hovering');
    }
  }
}

window.GalleryControls = GalleryControls;
