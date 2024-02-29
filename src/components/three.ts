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

const cameraOffsetX = -4;
const cameraOffsetY = 1;
const cameraOffsetZ = -6;
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
  canvas: document.querySelector("#bg") as HTMLCanvasElement,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const loadingManager = new THREE.LoadingManager();

// skybox
const cubeLoader = new THREE.CubeTextureLoader(loadingManager);
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
pointLight.position.set(0.8, 0.3, 4.8);
scene.add(pointLight);

// helpers
const gridHelper = new THREE.GridHelper(15, 15);
scene.add(gridHelper);

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// github skyline mesh
const skylineLoader = new STLLoader(loadingManager);
skylineLoader.load(
  "objects/MochaSteve256-2023.stl",
  function (geometry) {
    const material = new THREE.MeshPhongMaterial({
      color: 0x005533,
      specular: 0x111111,
      shininess: 200,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry as THREE.BufferGeometry, material);
    mesh.scale.set(0.07, 0.07, 0.07);
    setRotation(mesh, -.5 * Math.PI, 0, -.5 * Math.PI);
    mesh.position.x = 4;
    mesh.position.z = -2;
    mesh.position.y = .3;
    scene.add(mesh);
  }
)

// generate stars
function addStar(
  hRange: number,
  vRange: number,
  hOffset: number,
  vOffset: number,
) {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // material colors
  const colors = [
    0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff,
    0xffffff, 0x7700ff, 0x00ff00, 0xffaa00, 0xff0000, 0x00ffff, 0xffff00,
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const material = new THREE.MeshBasicMaterial({ color: randomColor });
  const star = new THREE.Mesh(geometry, material);

  let [x, y, z] = Array(3).fill(0);
  x = Math.random() * hRange - hOffset;
  y = Math.random() * vRange - vOffset;
  z = Math.random() * hRange - hOffset;

  star.position.set(x, y, z);
  scene.add(star);
}
Array(1500)
  .fill(0)
  .forEach(() => {
    addStar(300, 320, 150, 20);
  });
Array(100)
  .fill(0)
  .forEach(() => {
    addStar(80, 80, 40, 40);
  });

// window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

function setRotation(
  obj: THREE.Object3D,
  x: number,
  y: number,
  z: number,
): void {
  const qX = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    x,
  );
  const qY = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    y,
  );
  const qZ = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    z,
  );

  //reset rotation
  obj.quaternion.set(0, 0, 0, 1);

  obj.quaternion.multiply(qX);
  obj.quaternion.multiply(qY);
  obj.quaternion.multiply(qZ);
}
function lerpVectors(
  vec1: THREE.Vector3,
  vec2: THREE.Vector3,
  amount: number,
): THREE.Vector3 {
  const x = vec1.x * amount + vec2.x * (1 - amount);
  const y = vec1.y * amount + vec2.y * (1 - amount);
  const z = vec1.z * amount + vec2.z * (1 - amount);
  return new THREE.Vector3(x, y, z);
}
function rotateObjectToPoint(
  object: THREE.Object3D,
  targetPoint: THREE.Vector3,
): void {
  // Calculate the direction vector from the object's position to the target point
  const direction = new THREE.Vector3();
  direction.subVectors(targetPoint, object.position).normalize();

  // Create a lookAt matrix to orient the object towards the target point
  const lookAtMatrix = new THREE.Matrix4();
  lookAtMatrix.lookAt(object.position, targetPoint, object.up);

  // Extract the rotation quaternion from the lookAt matrix
  const quaternion = new THREE.Quaternion();
  quaternion.setFromRotationMatrix(lookAtMatrix);

  // Apply the rotation to the object
  object.quaternion.copy(quaternion);
}
// move stuff on scroll
const smoothDeltaThreshold: number = 200;
const acceleration: number = .8;
let smoothT: number = document.body.getBoundingClientRect().top; 
let tV: number = 0;
function moveCamera(): void {
  const delta = smoothT - document.body.getBoundingClientRect().top;
  if (delta < 0 && Math.abs(delta) > smoothDeltaThreshold) {
    tV += acceleration;
  }
  else if (delta > 0 && Math.abs(delta) > smoothDeltaThreshold) {
    tV -= acceleration;
  }
  smoothT += tV;
  tV *= 0.97;

  //console.log(camera.position);

  camera.position.z = smoothT * -0.01 + cameraOffsetZ;
  camera.position.y = smoothT * -0.002 + cameraOffsetY;
  //camera.position.x = smoothT * -0.01 + cameraOffsetX;
}

//document.body.onscroll = moveCamera;

// animation function
function animate(): void {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.03;

  moveCamera();

  rotateObjectToPoint(camera, cube.position);

  renderer.render(scene, camera);
}

//spawn loading screen

loadingManager.onLoad = () => {
  //remove loading screen
  
  animate();
}
