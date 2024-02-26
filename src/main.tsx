import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//lights
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.04 );
scene.add( ambientLight );
const pointLight = new THREE.DirectionalLight( 0xffffff, 1 );
pointLight.position.set( 1, 2, 1 );
scene.add( pointLight );

//skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
	'skybox_a/px_Nero AI_Photo_x4.png',
	'skybox_a/nx_Nero AI_Photo_x4.png',
	'skybox_a/py_Nero AI_Photo_x4.png',
	'skybox_a/ny_Nero AI_Photo_x4.png',
	'skybox_a/pz_Nero AI_Photo_x4.png',
	'skybox_a/nz_Nero AI_Photo_x4.png'
]);
scene.background = texture;

//helpers
const lightHelper = new THREE.DirectionalLightHelper( pointLight );
scene.add( lightHelper );
const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );
//controls
const controls = new OrbitControls( camera, renderer.domElement );

//animation function
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	controls.update();
	renderer.render( scene, camera );
}

animate();