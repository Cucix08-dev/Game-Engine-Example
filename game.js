const canvas = document.getElementById("game");
const game = canvas.getContext('2d');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false,
    s: false,
    a: false,
    d: false
};

window.addEventListener("keydown", (event) => {
    if (event.key in keys) {
        keys[event.key] = true; 
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key in keys) {
        keys[event.key] = false;  
    }
});

class Player {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.gravity = 3;
        this.jump = 10;
    }

    update() {
        if (keys.ArrowUp || keys[" "]){
            this.y -=  this.jump;
        } 
        if (keys.ArrowDown || keys.s) this.y += this.speed;
        if (keys.ArrowLeft || keys.a) this.x -= this.speed;
        if (keys.ArrowRight || keys.d) this.x += this.speed;

        this.y += this.gravity;
    }

    draw() {
        game.strokeStyle = "black";
        game.lineWidth = 2;
        game.strokeRect(this.x, this.y, this.width, this.height);
    }
}

const giocatore = new Player(100, 100, 40, 60, 4);


function loop() {
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    
    game.clearRect(0, 0, canvas.width, canvas.height);

    
    giocatore.update();
    giocatore.draw();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);