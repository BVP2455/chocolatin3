//Counting score
let count = 0;




// For canvas
const background = document.getElementById("background");
const context = background.getContext("2d");

context.font = "10 px Times New Roman"
context.fillText("Score", 10, 20)

//Implementing the picture to be the background
const backgroundImage = new Image();
backgroundImage.src = "pictures/background inspirational wonderful.png";

//Drawing the image
backgroundImage.onload = function () {
    context.drawImage(backgroundImage, 0, 0, background.width, background.height);
};

const wineImg = new Image();
wineImg.src = 'pictures/wine.png';

let cheeseImg = new Image();
cheeseImg.src = 'pictures/cheese.png';

let baguetteImg = new Image();
baguetteImg.src = 'pictures/baguette.png';

let airplaneImg = new Image();
airplaneImg.src = 'pictures/airplane.png';

let candleImg = new Image();
candleImg.src = 'pictures/candle.png';

let score = 0;
let gameSpeed = 6;
let isGameOver = false;

let wine = {
    x: 50,
    y: 300,
    width: 60,
    height: 80,
    velocityY: 0,
    gravity: 0.6,
    jumpForce: -12,
    isOnGround: true
};

let obstacles = [];
let obstacleTypes = [cheeseImg, baguetteImg, airplaneImg, candleImg];
let spawnTimer = 0;

// start of game 
document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && !isGameOver);
    gameLoop();
});

//ground for loop
const groundY = 300;
let airTime = 0;

// game loop 
function gameLoop() {
    wine.y += wine.velocityY; // move player by velocity  
    wine.velocityY += wine.gravity;

    // get wine back on ground -> not below 
    if (wine.y >= groundY) { // >= since happens when player below ground level since top of screen 0 and towards buttom higher number y 
        wine.y = groundY; // reset player to ground level
        wine.velocityY = 0
        wine.isOnGround = true;
    }

    //airtime counter
    if (!wine.isOnGround) {
        airTime += 1
    } else {
        airTime = 0;
    }

    requestAnimationFrame(gameLoop);
}

// the jump itself keyboard event 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && wine.isOnGround) {
        wine.velocityY = -15; // Adjust jump hight)
        wine.isOnGround = false;
    }
});

