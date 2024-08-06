import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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

// Animation loop
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
