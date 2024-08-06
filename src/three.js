import * as THREE from 'three';

// Create new scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);

// Cube
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

// Line
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
// const points = [
//   new THREE.Vector3(-10, 0, 0),
//   new THREE.Vector3(0, 10, 0),
//   new THREE.Vector3(10, 0, 0),
// ];

// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(lineGeometry, lineMaterial);
// scene.add(line);

// Camera Position
camera.position.z = 20;

// Texture loader
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  '/floor.Jpg', // Ensure this path is correct
  (texture) => {
    // Create the floor
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false; // Disable mipmaps if the texture is not a power of two
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const floorPlain = new THREE.Mesh(planeGeometry, planeMaterial);
    floorPlain.rotation.x = -Math.PI / 2; // to rotate the floor 90deg
    floorPlain.position.y = -Math.PI; // to rotate Y axios 180deg.
    scene.add(floorPlain);
  },
  undefined,
  (err) => {
    console.error('An error occurred loading the texture:', err);
  }
);

// create walls
const wallGroup = new THREE.Group();
scene.add(wallGroup);
// Front wall
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.01),
  new THREE.MeshBasicMaterial({ color: '#F0E2E2' })
);
frontWall.position.z = -20;

// Left wall
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.01),
  new THREE.MeshBasicMaterial({ color: 'pink' })
);

leftWall.rotation.y = Math.PI / 2; // rotate 90deg
leftWall.position.x = -20;

const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.01),
  new THREE.MeshBasicMaterial({ color: 'pink' })
);
rightWall.rotation.y = Math.PI / 2; // rotate 90deg
rightWall.position.x = 20;

wallGroup.add(frontWall, leftWall, rightWall);

// Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
const ceilingMaterial = new THREE.MeshBasicMaterial({ color: '#F7EEED' });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 10;
scene.add(ceiling);

// Animation loop
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
