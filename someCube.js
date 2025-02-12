import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';


// Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

// Камера
const sizes = {
    width: 600,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

const geometry = new THREE.BoxGeometry(1,1,1)


// Adding group
const group = new THREE.Group();
const meshes = [];

// set colors
const colors = [0xb7e8d8, 0xe86344, 0xe8ab9c];

for(let x = -1.2; x <= 1.2; x = x+1.2){
    for(let y = -1.2; y <= 1.2; y = y+1.2){
        const material = new THREE.MeshBasicMaterial({
            color: colors[((Math.random() * 3) | 0) +1],
            wireframe: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.5,0.5,0.5);
        mesh.position.set(x,y,0);
        meshes.push(mesh);
    }
}

group.add(...meshes);
scene.add(group);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// animation
const clock = new THREE.Clock();

const MAX_SCLAE = 1;
const MIN_SCLAE = 0.5;
let grow = false;

const animate = () =>{

    const delta = clock.getDelta();
    meshes.forEach((item, index)=>{
        const mult = index % 2 === 0 ? 1 : -1;
        item.rotation.x += mult * delta;
        item.rotation.y += mult * delta * 0.4;
    });

    const elapsed = clock.getElapsedTime();
    camera.position.x = Math.sin(elapsed)
    camera.position.y = Math.cos(elapsed)
    camera.lookAt(new THREE.Vector3(0,0,0))

    const mult = grow ? 1 : -1;
    group.scale.x += mult * delta * 0.2;
    group.scale.y += mult * delta * 0.2;
    group.scale.z += mult * delta * 0.2;

    if(grow && group.scale.x>= MAX_SCLAE){
        grow = false;
    }else if(group.scale.x <= MIN_SCLAE){
        grow = true;
    }
         


    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)
}
animate();