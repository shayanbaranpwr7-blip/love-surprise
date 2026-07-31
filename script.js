// =============================
// Love Surprise v2 - Part 1
// =============================

// Canvas Rain
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

// Rain
const drops = [];

for (let i = 0; i < 250; i++) {

    drops.push({

        x: Math.random() * innerWidth,

        y: Math.random() * innerHeight,

        l: 10 + Math.random() * 25,

        s: 5 + Math.random() * 7

    });

}

function rain() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.lineWidth = 1;

    for (const d of drops) {

        ctx.beginPath();

        ctx.moveTo(d.x, d.y);

        ctx.lineTo(d.x + 2, d.y + d.l);

        ctx.stroke();

        d.y += d.s;

        if (d.y > canvas.height) {

            d.y = -20;

            d.x = Math.random() * canvas.width;

        }

    }

}

// Three.js
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
70,
innerWidth / innerHeight,
1,
5000
);

camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({

alpha: true,

antialias: true

});

renderer.setSize(innerWidth, innerHeight);

renderer.setPixelRatio(devicePixelRatio);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.zIndex = "-2";

document.body.appendChild(renderer.domElement);

// Stars

const geometry = new THREE.BufferGeometry();

const vertices = [];

for (let i = 0; i < 12000; i++) {

    vertices.push(

        (Math.random() - .5) * 3500,

        (Math.random() - .5) * 3500,

        (Math.random() - .5) * 3500

    );

}

geometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(vertices,3)

);

const material = new THREE.PointsMaterial({

color:0xffffff,

size:2,

transparent:true,

opacity:.85

});

const galaxy = new THREE.Points(

geometry,

material

);

scene.add(galaxy);
// ===== Part 2 =====

const startButton = document.getElementById("startButton");
const subtitleBox = document.getElementById("subtitleBox");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const story = [
"People think mathematics explains everything.",
"But some equations never end...",
"They become infinity.",
"And infinity reminds me of you.",
"Because every path...",
"Every proof...",
"Every answer...",
"Leads to one name.",
"Sheyda 🤍"
];

let currentLine = 0;
let started = false;

function nextLine(){

    if(currentLine>=story.length)return;

    subtitleBox.style.opacity="0";

    setTimeout(()=>{

        subtitleBox.innerHTML=story[currentLine];

        subtitleBox.style.opacity="1";

        currentLine++;

    },500);

}

startButton.onclick=()=>{

    if(started)return;

    started=true;

    startButton.style.display="none";

    gsap.to(title,{
        y:-80,
        duration:2
    });

    gsap.to(subtitle,{
        opacity:0,
        duration:2
    });

    nextLine();

    setInterval(nextLine,4500);

};

function animate(){

    requestAnimationFrame(animate);

    rain();

    galaxy.rotation.y+=0.00008;

    galaxy.rotation.x+=0.00002;

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=innerWidth/innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(innerWidth,innerHeight);

resizeCanvas();

});
// ===== Part 3 =====

// Twinkle Effect
let t = 0;

function twinkle(){

    t += 0.01;

    material.opacity = 0.65 + Math.sin(t) * 0.25;

}

// Floating Camera
function moveCamera(){

    camera.position.x = Math.sin(Date.now()*0.00015)*20;

    camera.position.y = Math.cos(Date.now()*0.00012)*12;

    camera.lookAt(scene.position);

}

// Floating Title
gsap.to("#title",{

    y:-15,

    repeat:-1,

    yoyo:true,

    duration:3,

    ease:"sine.inOut"

});

// Floating Subtitle Box
gsap.to("#subtitleBox",{

    y:-8,

    repeat:-1,

    yoyo:true,

    duration:2.8,

    ease:"sine.inOut"

});

// White Hearts
const heartContainer=document.createElement("div");

heartContainer.style.position="fixed";
heartContainer.style.left="0";
heartContainer.style.top="0";
heartContainer.style.width="100%";
heartContainer.style.height="100%";
heartContainer.style.pointerEvents="none";
heartContainer.style.zIndex="3";

document.body.appendChild(heartContainer);

function createHeart(){

    const h=document.createElement("div");

    h.innerHTML="🤍";

    h.style.position="absolute";

    h.style.left=Math.random()*100+"vw";

    h.style.top="100vh";

    h.style.fontSize=(18+Math.random()*20)+"px";

    h.style.opacity=".9";

    h.style.transition="transform 8s linear, opacity 8s linear";

    heartContainer.appendChild(h);

    requestAnimationFrame(()=>{

        h.style.transform=`translateY(-120vh) translateX(${(Math.random()-0.5)*120}px)`;

        h.style.opacity="0";

    });

    setTimeout(()=>{

        h.remove();

    },8000);

}

setInterval(createHeart,1600);

// Extend animation loop

const oldAnimate=animate;

cancelAnimationFrame(oldAnimate);

function loop(){

    requestAnimationFrame(loop);

    rain();

    twinkle();

    moveCamera();

    galaxy.rotation.y+=0.00008;

    galaxy.rotation.x+=0.00003;

    renderer.render(scene,camera);

}

loop();
// ===== Part 4 =====

// Final Message

setTimeout(()=>{

    if(currentLine>=story.length){

        subtitleBox.innerHTML=`
        <div style="
        font-size:34px;
        line-height:1.8;
        text-shadow:0 0 20px rgba(255,255,255,.4);
        ">
        I love you,<br>
        <span style="font-size:52px;">
        Sheyda 🤍
        </span>
        </div>
        `;

    }

},42000);

// Slow Galaxy Rotation

gsap.to(galaxy.rotation,{

    y:galaxy.rotation.y+6.28,

    duration:260,

    repeat:-1,

    ease:"none"

});

// Background Fade

gsap.to("body",{

    backgroundPosition:"50% 100%",

    duration:120,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

// Soft Glow

const glow=document.createElement("div");

glow.style.position="fixed";
glow.style.left="50%";
glow.style.top="50%";
glow.style.width="700px";
glow.style.height="700px";
glow.style.transform="translate(-50%,-50%)";
glow.style.borderRadius="50%";
glow.style.background="radial-gradient(circle,rgba(255,255,255,.08),transparent 70%)";
glow.style.pointerEvents="none";
glow.style.zIndex="-1";

document.body.appendChild(glow);

gsap.to(glow,{

scale:1.15,

repeat:-1,

yoyo:true,

duration:4,

ease:"sine.inOut"

});
// ===== Part 5 =====

// Rain Speed Variation
setInterval(()=>{

    for(const d of drops){

        d.s = 4 + Math.random()*8;

    }

},3000);

// Mouse Parallax
window.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth)-0.5;
    const y=(e.clientY/window.innerHeight)-0.5;

    gsap.to(camera.position,{
        x:x*35,
        y:-y*20,
        duration:1.5
    });

});

// Subtitle Fade
subtitleBox.style.transition="opacity .8s";

// Final Heart Burst
function heartBurst(){

    for(let i=0;i<30;i++){

        setTimeout(createHeart,i*120);

    }

}

setTimeout(heartBurst,42000);

// End Screen Glow
setTimeout(()=>{

    gsap.to("#overlay",{

        scale:1.03,

        duration:4,

        repeat:-1,

        yoyo:true,

        ease:"sine.inOut"

    });

},42000);
