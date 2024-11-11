import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const cursor = {
    x: 0,
    y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

// Объект
// cube
// const geometry = new THREE.BoxGeometry(1, 1,1, 10,10,10);
// disk
// const geometry = new THREE.CircleGeometry(1,20, 0, Math.PI)
// plane
// const geometry = new THREE.PlaneGeometry(1,1, 10,10)
// conus
// const geometry = new THREE.ConeGeometry(1,2,32,1,true,0, Math.PI)
// cilinder
// const geometry = new THREE.CylinderGeometry(1,1,2,32)
// circle
// const geometry = new THREE.RingGeometry(0.5,1,32,10)
// poncic
// const geometry = new THREE.TorusGeometry(1,0.5,16,100)
// node
// const geometry = new THREE.TorusKnotGeometry(1, 0.25,100,16,1,6)
// sfera
// const geometry = new THREE.DodecahedronGeometry(1,10)
// sfera cu 8
// const geometry = new THREE.OctahedronGeometry(1,0)
// piramida
// const geometry = new THREE.TetrahedronGeometry(1,0)
// tot sfera
// const geometry = new THREE.IcosahedronGeometry(1,0)
// const geometry = new THREE.SphereGeometry(1,32,16)

// singur facem o geometrie
const geometry = new THREE.BufferGeometry();

const amount = 50;

const points = new Float32Array(amount * 3 * 3)

for(let i =0; i<amount*3*3; i++){
    points[i] = (Math.random()-0.5)*4;
}

const pointsBuffer = new THREE.BufferAttribute(points,3)
geometry.setAttribute('position', pointsBuffer)

const material = new THREE.MeshBasicMaterial({
    color: 'yellow',
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();

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

// fullEcran
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});