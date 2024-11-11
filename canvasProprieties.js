import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://cdn.skypack.dev/stats.js';
import * as dat from 'https://cdn.skypack.dev/lil-gui';

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

const parameters = {
    color: 0xff0000
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// stats fps
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom)

// exemplar lui lil gui
const gui = new dat.GUI({closeFolders: true});


scene.add(camera);

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: parameters.color,
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

// gui
const scaleFolder = gui.addFolder('Scale');
scaleFolder.add(mesh.scale, "x").min(0).max(5).step(0.1).name('Box scale x');
scaleFolder.add(mesh.scale, "y").min(0).max(5).step(0.1).name('Box scale y');
scaleFolder.add(mesh.scale, "z").min(0).max(5).step(0.1).name('Box scale z');

gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(parameters, 'color').onChange(()=>material.color.set(parameters.color))


scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const tick = () => {
// de cand sa inceapa a arata fpsul
    stats.begin();

    controls.update();
    renderer.render(scene, camera);

    stats.end()

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