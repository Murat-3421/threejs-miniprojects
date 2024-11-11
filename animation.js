import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: "blue",
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh);

const sizes ={
    width: 600,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene,camera);

// animation
// time with vanilla
let time = Date.now();

// time with method
const clock = new THREE.Clock();

const tick = ()=>{
    // vanilla
    // const currenTime = Date.now();
    // const delta = currenTime - time;
    // time = currenTime;
    // mesh.rotation.y += 0.1 * delta;


    // method
    const elipsedTime = clock.getElapsedTime();
   // mesh.rotation.y = elipsedTime;

    //mesh/object move   
    // mesh.position.x = Math.cos(elipsedTime);
    // mesh.position.y = Math.sin(elipsedTime);

    // camera move
    camera.position.x = Math.cos(elipsedTime);
    camera.position.y = Math.sin(elipsedTime);
    camera.lookAt(mesh.position)

    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}

tick();