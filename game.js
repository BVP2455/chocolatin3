//Counting score
let score = 0;

let board;




// Setting up the canvas and context
const background = document.getElementById("background");
const context = background.getContext("2d");

// Displaying the score on the canvas
context.font = "10 px Times New Roman"
context.fillText("Score", 10, 20)

//Implementing the picture to be the background
const backgroundImage = new Image();
backgroundImage.src = "pictures/background inspirational wonderful.png";

const wineImageStart = new Image();
wineImageStart.src = "pictures/glassOfWineClose.png";

// The start function
window.onload = function() {
    board = document.getElementById("background");
    console.log(board.width);
    console.log(board.height);
    context = board.getContext("2d");

        
        wineImageStart.onload = function() {
            context.drawImage(wineImageStart, 50, 100, 60, 80);
        }
        
    
        
    
    //backgroundImage.onload = drawStartScreen;
    //wineImageStart.onload = drawStartScreen;

    //requestAnimationFrame(gameLoop);
    //setInterval(spawnObstacles,1000);
 
};


const wineRight = new Image();
wineRight.src = 'pictures/glassOfWineRight.png';

const wineLeft = new Image();
wineLeft.src = 'pictures/glassOfWineLeft.png';

let cheeseImg = new Image();
cheeseImg.src = 'pictures/cheese.png';

let baguetteImg = new Image();
baguetteImg.src = 'pictures/baguette.png';

let airplaneImg = new Image();
airplaneImg.src = 'pictures/airplane.png';

let candleImg = new Image();
candleImg.src = 'pictures/candle.png';

let tarteImg = new Image();
tarteImg.src = 'pictures/tarte0.png';

let gameSpeed = 6;
let isGameOver = false;

//For making the wine glass look like it's moving by toggling between two images
let wineImages = [wineLeft, wineRight]
let imageIndex = 0;

setInterval(function() { 
    imageIndex = (imageIndex + 1) % wineImages.length; // Toggle between 0 and 1
}, 150); // Change image every 500 milliseconds

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
let obstacleTypes = [cheeseImg, baguetteImg, airplaneImg, candleImg, tarteImg];
let spawnTimer = 0;
let backgroundX = 0;


//ground for loop
const groundY = 300;
let airTime = 0;

/*window.onload = function(){
    // start of game 
    document.addEventListener("keydown", function (event) {
        if (event.code === "Enter" && !isGameOver){
        gameLoop();}
    });
    requestAnimationFrame(gameLoop);
    setInterval(spawnObstacles,1000);
    
}*/

// game loop 
function gameLoop() {
    if (isGameOver){
        context.font ="30px arial"
        context.fillText("Game Over",200,200);
        return;
    }
    // clear and draw
    context.clearRect(0, 0, background.width, background.height);
    context.drawImage(backgroundImage, 0, 0, background.width, background.height);
    //move the glass
    moveg();
    context.drawImage(wineImg,wine.x,wine.y,wine.width,wine.height);
    
    moveObstacles();
    score++;
    
    requestAnimationFrame(gameLoop);
}

function moveg(){
    // move player by velocity
    wine.y += wine.velocityY;   
    wine.velocityY += wine.gravity;

    // get wine back on ground -> not below 
    if (wine.y >= groundY) { // >= since happens when player below ground level since top of screen 0 and towards buttom higher number y 
        wine.y = groundY; // reset player to ground level
        wine.velocityY = 0
        wine.isOnGround = true;
    }
}
// the jump itself keyboard event 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && wine.isOnGround) {
        wine.velocityY = -15; // Adjust jump hight)
        wine.isOnGround = false;
    }
});

//generate obstacles at random intervals and types
function spawnObstacles() {
    if (isGameOver) { return; }
    spawnTimer++;
    let type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    isAir = (type === airplaneImg);
    obstacles.push({
        x: canvas.width,
        y: isAir ? 220 : 320,
        width: 60,
        height: 50,
        image: type
    });
}

// obstacles moving
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;
        context.drawImage(obstacles[i].image, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        collision(obstacle[i]);
    }
}   

//function to handle game over when the player collides with an obstacle
function handleGameOver() {
    isGameOver = true;
    setTimeout(() => {
        alert("Game Over! Your score: " + score);
        resetGame();
    }, 100);
}

function collision(obstacle){
    if ( wine.x < obstacle.x + obstacle.width && wine.x + wine.width > obstacle.x &&
        wine.y< obstacle.y + obstacle.height && wine.y + wine.height > obstacle.y ){
        handleGameOver();
    }  
}

//function to reset the game when the player loses
function resetGame() {
    score = 0;
    obstacles = [];
    wine.y = 300;
    wine.velocityY = 0;
    isGameOver = false;
}

//function to change the wine sprite right to left and vice versa
function wineSprite() {
    if (wine.velocityY < 0) {
        return wineLeft;
    } else {
        return wineRight;
    }
}