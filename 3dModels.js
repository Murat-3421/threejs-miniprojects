import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://cdn.skypack.dev/stats.js';
import * as dat from 'https://cdn.skypack.dev/lil-gui';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import init from './init.js';

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.set(0,2,5);


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5,
    }),
)

floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const dirLighr = new THREE.DirectionalLight(0xffffff, 0.54);
dirLighr.position.set(-8,12,8)
dirLighr.castShadow = true;
dirLighr.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLighr);

// loader
const loader = new GLTFLoader();
// animation
let mixer = null;
loader.load(
    './static/models/Duck/Duck.gltf',
    (gltf)=>{
        // animation
        mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        // gltf.scene.children[0].scale.set(50,50,50)
        scene.add(gltf.scene)
    })

const clock = new THREE.Clock()
const tick = () => {
	controls.update();
	renderer.render(scene, camera);
    const delta = clock.getData();
    if(mixer){
        mixer.update(delta)
    };
	window.requestAnimationFrame(tick);
};
tick();



/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});