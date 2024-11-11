import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';

// Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

// Камера
const sizes = {
    width: 600,
    height: 600,
};

const cursor = {
    x: 0,
    y: 0,
};



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

// add object with orbote controls
const controls = new OrbitControls(camera,canvas)
// miscarile sunt mai curate , lente
controls.enableDamping = true;

scene.add(camera);

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'yellow',
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// addeventListener
window.addEventListener('mousemove', (event)=>{
    cursor.x = -(event.clientX / sizes.width - 0.5)
    cursor.y = event.clientY / sizes.height - 0.5
})

// tick
const tick = ()=>{
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    // camera.position.y = cursor.y * 2;
    // camera.lookAt(mesh.position);

    // miscarile sunt mai curate , lente
    controls.update()
    
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}

tick();