import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const cameraOffsetX = -3;
const cameraOffsetY = 1;
const cameraOffsetZ = -5;
const cameraRotationOffsetX = 0;
const cameraRotationOffsetY = -2;
const cameraRotationOffsetZ = 0;
camera.position.x = cameraOffsetX;
camera.position.y = cameraOffsetY;
camera.position.z = cameraOffsetZ;
camera.rotation.x = cameraRotationOffsetX;
camera.rotation.y = cameraRotationOffsetY;
camera.rotation.z = cameraRotationOffsetZ;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg") as HTMLCanvasElement
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// skybox
const cubeLoader = new THREE.CubeTextureLoader();
const texture = cubeLoader.load([
  "skybox/a/px.png",
  "skybox/a/nx.png",
  "skybox/a/py.png",
  "skybox/a/ny.png",
  "skybox/a/pz.png",
  "skybox/a/nz.png",
]);
scene.background = texture;

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.04);
scene.add(ambientLight);
const pointLight = new THREE.DirectionalLight(0xffffff, 10);
pointLight.position.set(.8, .3, 4.8);
scene.add(pointLight);

// helpers
const lightHelper = new THREE.DirectionalLightHelper(pointLight);
scene.add(lightHelper);
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// github skyline mesh
const skylineLoader = new STLLoader();
skylineLoader.load(
  "MochaSteve256-2023.stl",
  function (geometry) {
    const material = new THREE.MeshPhongMaterial({
      color: 0x005533,
      specular: 0x111111,
      shininess: 200,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry as THREE.BufferGeometry, material);
    mesh.scale.set(0.02, 0.02, 0.02);
    setRotation(mesh, -0.5 * Math.PI, 0, 0);
    mesh.position.x = -2;
    mesh.position.z = -4;
    scene.add(mesh);
  }
)

// animation function
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.03;

  console.log(camera.rotation);

  renderer.render(scene, camera);
}

// generate stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  // material colors
  const colors = [
    0xffffff,
    0xffffff,
    0xffffff,
    0xffffff,
    0xffffff,
    0x7700ff,
    0x00ff00,
    0xffaa00,
    0xff0000,
    0x00ffff,
    0xffff00
  ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const material = new THREE.MeshBasicMaterial({ color: randomColor });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(400).fill(0).forEach(addStar);

// window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

function setRotation(obj: THREE.Object3D, x: number, y: number, z: number) {
  const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), x);
  const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), y);
  const qZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), z);

  //reset rotation
  obj.quaternion.set(0, 0, 0, 1);

  obj.quaternion.multiply(qX);
  obj.quaternion.multiply(qY);
  obj.quaternion.multiply(qZ);
}
// move stuff on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01 + cameraOffsetZ;
  camera.position.y = t * -0.002 + cameraOffsetY;
  setRotation(camera, t * 0.0002 + cameraRotationOffsetX, t * -0.002 + cameraRotationOffsetY, 0 + cameraRotationOffsetZ);

}
document.body.onscroll = moveCamera;

animate();
