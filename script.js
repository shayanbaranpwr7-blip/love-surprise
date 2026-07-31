// ===========================
// Love Surprise - Part 1
// ===========================

// Canvas Rain
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Rain Drops
const drops = [];

for (let i = 0; i < 350; i++) {
  drops.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed: 6 + Math.random() * 8,
    length: 10 + Math.random() * 20
  });
}

function drawRain() {

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle="rgba(255,255,255,.18)";
  ctx.lineWidth=1;

  for(const d of drops){

    ctx.beginPath();

    ctx.moveTo(d.x,d.y);

    ctx.lineTo(d.x+2,d.y+d.length);

    ctx.stroke();

    d.y+=d.speed;

    if(d.y>canvas.height){

      d.y=-20;

      d.x=Math.random()*canvas.width;

    }

  }

}

// Three.js Scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
1,
5000
);

camera.position.z=700;

const renderer=new THREE.WebGLRenderer({

alpha:true,

antialias:true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.domElement.style.position="fixed";
renderer.domElement.style.left="0";
renderer.domElement.style.top="0";
renderer.domElement.style.zIndex="-2";

document.body.appendChild(renderer.domElement);

// Stars

const starGeometry=new THREE.BufferGeometry();

const starCount=18000;

const positions=[];

for(let i=0;i<starCount;i++){

positions.push(

(Math.random()-0.5)*4000,

(Math.random()-0.5)*4000,

(Math.random()-0.5)*4000

);

}

starGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(positions,3)

);

const starMaterial=new THREE.PointsMaterial({

color:0xffffff,

size:2,

transparent:true,

opacity:.9

});

const stars=new THREE.Points(

starGeometry,

starMaterial

);

scene.add(stars);

// Animation

function animate(){

requestAnimationFrame(animate);

drawRain();

stars.rotation.y+=0.00008;

stars.rotation.x+=0.00003;

renderer.render(scene,camera);

}

animate();

// ===========================
// Love Surprise - Part 2
// ===========================

// Overlay Elements
const startButton = document.getElementById("startButton");
const subtitleBox = document.getElementById("subtitleBox");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

// Initial state
subtitleBox.style.opacity = "0";

// Story lines
const story = [
  "Some equations can be solved...",
  "Some mysteries can be understood...",
  "But one feeling keeps growing...",
  "No theorem could ever prove it...",
  "Yet my heart already knows the answer.",
  "For Sheyda 🤍"
];

let line = 0;

function showNextLine() {
  if (line >= story.length) return;

  subtitleBox.style.opacity = "0";

  setTimeout(() => {
    subtitleBox.innerHTML = story[line];
    subtitleBox.style.opacity = "1";
    line++;
  }, 400);
}

// Start button
startButton.addEventListener("click", () => {

  startButton.style.display = "none";

  title.style.transition = "2s";
  subtitle.style.transition = "2s";

  title.style.transform = "translateY(-80px)";
  subtitle.style.opacity = "0";

  showNextLine();

  setInterval(showNextLine, 5000);

});

// Window resize
window.addEventListener("resize", () => {

  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  resizeCanvas();

});
