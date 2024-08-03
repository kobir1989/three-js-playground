import * as THREE from 'three';

// Create new scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near (how near camera)
  1000 // Far (How far the camera)
);

scene.add(camera);
camera.position.z = 5; // move camera back to 5 units

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true }); // For smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // Background color
document.body.appendChild(renderer.domElement); // add the renderer to HTML

// Lights
// Ambient Light
const ambientLight = new THREE.AmbientLight(0x101010, 1.0); // Color, intensity
ambientLight.position.set(camera.position.x, camera.position.y, camera.position.z); // Set position
scene.add(ambientLight);

// Directional Light
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // Color, intensity
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Color of the object
const cube = new THREE.Mesh(geometry, material); // creats cube with geometry and materials
scene.add(cube);

const render = () => {
  cube.rotation.x = cube.rotation.x + 0.01;
  cube.rotation.y = cube.rotation.y + 0.01;
  renderer.render(scene, camera); // Render the scene
};
render();
