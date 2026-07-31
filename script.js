// ===== Three.js Scene =====

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
2000
);

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.domElement.style.position="fixed";
renderer.domElement.style.top="0";
renderer.domElement.style.left="0";
renderer.domElement.style.zIndex="-1";

document.body.appendChild(renderer.domElement);
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drops = [];

for(let i=0;i<250;i++){
    drops.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        l:Math.random()*20+10,
        s:Math.random()*6+4
    });
}

function rain(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="rgba(255,255,255,.25)";
    ctx.lineWidth=1;

    drops.forEach(d=>{

        ctx.beginPath();

        ctx.moveTo(d.x,d.y);

        ctx.lineTo(d.x+
