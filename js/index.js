const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//import image
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeTop.src = 'img/pipeNorth.png';
pipeBottom.src = 'img/pipeSouth.png';

//game over status
let isGameOver = false;

//score
let score = 0;

//margin between pipe
let margin = 90;

//position and speed bird
let posX = 10;
let posY = 150;
let gravity = 2;

//position pipe
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
};

//block game over
const div = document.createElement('div');
const h1 = document.createElement('h1');
const p = document.createElement('p');
const btn = document.createElement('button');
//block game over id
div.id = 'over';
//text in block game over
h1.innerText = 'GAME OVER!';
p.innerText = `${score}`;
btn.innerHTML = "<i class=\"fas fa-sync-alt play\"></i>";
//append child
document.body.appendChild(div);
div.appendChild(h1);
div.appendChild(p);
div.appendChild(btn);

//function move up bird
document.addEventListener('keydown', moveUp);
function moveUp(e) {
    if(e.keyCode === 38) {
        posY -= 30;
    }
}

//function game over
function gameOver() {
    document.getElementById('over').style.display = 'block';
    isGameOver = true;
}

btn.addEventListener('click', reset);
function reset() {
    document.getElementById('over').style.display = 'none';
    isGameOver = false;
    location.reload();
}

function draw() {
    posY += gravity;

    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + margin);

        pipe[i].x -= 1;

        if(pipe[i].x === 100) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pipeTop.height) - pipeTop.height
            });
        }

        if(posY + bird.height > canvas.height - fg.height
            || posX + bird.width >= pipe[i].x
            && posX <= pipe[i].x + pipeTop.width
            && (posY <= pipe[i].y + pipeTop.height
            || posY + bird.height >= pipe[i].y + pipeTop.height + margin)){
            gameOver();
            clearInterval(interval);
        }

        if(pipe[i].x === -5) {
            score++;
            p.innerText = `${score}`;
        }
    }

    ctx.drawImage(bird,posX, posY);

    ctx.drawImage(fg, 0, canvas.height - fg.height);

    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 500);
}
let interval = setInterval(draw, 1000/60);