const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");


let width;
let height;

let stars = [];



function resize(){

    width = canvas.width = window.innerWidth;

    height = canvas.height = window.innerHeight;

}


resize();

window.addEventListener(
    "resize",
    resize
);



function createStars(){

    stars = [];

    for(let i = 0; i < 350; i++){

        stars.push({

            x: Math.random() * width,

            y: Math.random() * height,

            size: Math.random() * 1.8 + .3,

            speed: Math.random() * .15 + .02,

            opacity: Math.random()

        });

    }

}


createStars();



function drawStars(){

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    stars.forEach(star=>{


        ctx.beginPath();


        ctx.fillStyle =
        `rgba(255,255,255,${star.opacity})`;


        ctx.arc(

            star.x,

            star.y,

            star.size,

            0,

            Math.PI * 2

        );


        ctx.fill();



        star.y += star.speed;



        if(star.y > height){

            star.y = 0;

        }


    });


    requestAnimationFrame(drawStars);


}


drawStars();





const button =
document.getElementById("startButton");

const music =
document.getElementById("music");



button.addEventListener(
"click",
()=>{


    button.innerHTML =
    "Welcome 🤍";


    music.volume = .25;


    music.play()
    .catch(()=>{});


});
