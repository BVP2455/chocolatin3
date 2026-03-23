// Setting up the canvas and context
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let score = 0;
let gameSpeed = 6;
let isGameOver = false;

//ground for loop
const groundY = 250;

let wine = {
    x: 50,
    y: groundY,
    width: 100,
    height: 150,
    velocityY: 0,
    gravity: 0.6,
    jumpForce: -15,
    isOnGround: true
};

const backgroundImage = new Image();
backgroundImage.src = "pictures/background inspirational wonderful.png";

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

let wineImages = [wineRight, wineLeft];
let imageIndex = 0;

setInterval(function() { 
    imageIndex = (imageIndex + 1) % wineImages.length; // Toggle between 0 and 1
}, 150); // Change image every 500 milliseconds

let obstacles = [];
let obstacleTypes = [cheeseImg, baguetteImg, airplaneImg, candleImg];

function updatePlayer() {
    // Apply gravity
    wine.y += wine.velocityY;
    wine.velocityY += wine.gravity;
    // Ground collision
    if (wine.y >= groundY) {
        wine.y = groundY;
        wine.velocityY = 0;
        wine.isOnGround = true;
    }
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        // Check collision
        if (checkCollision(wine, obstacles[i])) {
            handleGameOver();
        }
        // Remove obstacles that are off-screen
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

function checkCollision(player, obj) {
    return player.x < obj.x + obj.width &&
           player.x + player.width > obj.x &&
           player.y < obj.y + obj.height &&
           player.y + player.height > obj.y;
}

//generate obstacles at random intervals and types
function spawnObstacle() {
    if (isGameOver) return;    
    let type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    let isAir = (type === airplaneImg);
    obstacles.push({
        x: canvas.width,
        y: isAir ? 220 : 320,
        width: 60,
        height: 50,
        image: type
    });
}

//function to draw different elements of the game such as the background, player, obstacles and score
function draw() {
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw player (simple animation based on velocity)
    let currentSprite = wine.velocityY < 0 ? wineLeft : wineRight;
    ctx.drawImage(currentSprite, wine.x, wine.y, wine.width, wine.height);

    // Draw obstacles
    obstacles.forEach(obj => {
        ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
    });

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Times New Roman";
    ctx.fillText(`Score: ${Math.floor(score)}`, 20, 30);
}

//game loop
function gameLoop() {
    if (isGameOver) return;
    updatePlayer();
    updateObstacles();
    score += 0.1;
    draw();
    requestAnimationFrame(gameLoop);
}

//function to handle game over when the player collides with an obstacle
function handleGameOver() {
    isGameOver = true;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
    
    setTimeout(() => {
        alert("Final score: " + Math.floor(score));
        resetGame();
    }, 100);
}

//function to reset the game when the player loses
function resetGame() {
    score = 0;
    gameSpeed = 6;
    obstacles = [];
    wine.y = groundY;
    wine.velocityY = 0;
    isGameOver = false;
    gameLoop();
    nextObstacle();
}

// User input
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && wine.isOnGround) {
        wine.velocityY = wine.jumpForce;
        wine.isOnGround = false;
    }
    if (event.code === "Enter" && isGameOver) {
        resetGame();
    }
});

// the jump itself keyboard event
window.onload = function() {
    gameLoop();
    nextObstacle();

};


//For a more dynamic appearance of obstacles 
function nextObstacle() {
    if (isGameOver) return;
    let minDelay = Math.max(600, 1500 - gameSpeed * 50);
    let randomDelay = Math.random() * 1000 + minDelay;
    setTimeout(function() {
        spawnObstacle();
        nextObstacle();
    }, randomDelay);
}