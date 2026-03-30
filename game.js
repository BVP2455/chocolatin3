// Setting up the canvas and context
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let score = 0;
let gameSpeed = 6;
let isGameOver = false;
let gamestart= false;

//ground for loop
const groundY = 250;

let wine = {
    x: 50,
    y: groundY,
    width: 50,
    height: 80,
    velocityY: 0,
    gravity: 0.6,
    jumpForce: -15,
    isOnGround: true,
    isbenddown: false
};

const backgroundImage = new Image();
backgroundImage.src = "pictures/background inspirational wonderful.png";

const wineRight = new Image();
wineRight.src = 'pictures/glassOfWineRight.png';

const wineLeft = new Image();
wineLeft.src = 'pictures/glassOfWineLeft.png';

const wineStand = new Image();
wineStand.src = 'pictures/glassOfWineClose.png';

const wineBroken = new Image();
wineBroken.src = 'pictures/glassOfWineCasse.png';

const wineDown = new Image();
wineDown.src= 'pictures/glassOfWinedaoun.png'

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

const wineImages= [wineRight, wineLeft];
let imageIndex = 0;

const jumpSound = new Audio('sounds/JUMP.mp3');
const beforeGameOverSound = new Audio('sounds/beforeGAMEOVER.mp3');
const gameOverSound = new Audio('sounds/GAMEOVER.mp3');
const backgroundMusic = new Audio('sounds/MUSICBG.mp3');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.5; // Adjust volume as needed

setInterval(function() { 
    imageIndex = (imageIndex + 1) % wineImages.length; // Toggle between 0 and 1
}, 150); // Change image every 500 milliseconds

let obstacles = [];
let obstacleTypes = [cheeseImg, baguetteImg, airplaneImg, candleImg, tarteImg];
let spawnTimer = 0;


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
            if(obstacles[i].image=== airplaneImg && !wine.isbenddown){
                handleGameOver()
            }
            else { 
                handleGameOver();
            }
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
        y: isAir ? 200 : 280,
        width: 80,
        height: 60,
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
    let currentSprite = wineWalk();
    if (isGameOver) {
        ctx.drawImage(currentSprite, wine.x, wine.y, 120, 100); 
    } else if (wine.isbenddown) {
        ctx.drawImage(currentSprite, wine.x, wine.y, wine.width, wine.height);
    } else {
        ctx.drawImage(currentSprite, wine.x, wine.y, wine.width, wine.height);
    }
    // Draw obstacles
    obstacles.forEach(obj => {
        ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
    });

    ctx.fillStyle = "black";
    ctx.font = "20px Times New Roman";
    ctx.fillText(`score: ${Math.floor(score)}`, 20, 30);
}

//game loop
function gameLoop() {
    if (isGameOver) return;
    updatePlayer();
    updateObstacles();
    if (isGameOver) return;
    score += 0.1;
    draw();
    requestAnimationFrame(gameLoop);
}

function drawstart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage,0,0,canvas.width, canvas.height);
    ctx.fillStyle="black";
    ctx.font = "20px Times New Roman";
    ctx.fillText("Press Enter to start", 20, 30);
}

//function to handle game over when the player collides with an obstacle
function handleGameOver() {
    if (isGameOver) return;
    isGameOver = true;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    beforeGameOverSound.play();
    beforeGameOverSound.onended = function() {
        gameOverSound.play();
    };
    draw();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "40px Times New Roman";
    ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = "20px Times New Roman"; // smaller font
    ctx.fillText("Press Enter to play again", canvas.width / 2 - 100, canvas.height / 2 + 50); // +50 puts it below
    
    //setTimeout(() => {
       // alert("Final score: " + Math.floor(score));
   // }, 100);
}

//function to reset the game when the player loses
function resetGame() {
    score = 0;
    gameSpeed = 6;
    obstacles = [];
    wine.y = groundY;
    wine.velocityY = 0;
    isGameOver = false;
    beforeGameOverSound.pause();
    beforeGameOverSound.currentTime = 0;
    gameOverSound.pause();
    gameOverSound.currentTime = 0;
    
    backgroundMusic.play();
    gameLoop();
    nextObstacle();
}

// User input
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && wine.isOnGround && gamestart) {
        wine.velocityY = wine.jumpForce;
        wine.isOnGround = false;
        jumpSound.currentTime = 0; 
        jumpSound.play();
        if (backgroundMusic.paused) backgroundMusic.play();
    } 
    if (event.code === "Enter" && isGameOver) {
        resetGame();
    }
        else if (event.code === "Enter" && !gamestart) {
        gamestart = true
        backgroundMusic.play();
        gameLoop();
        nextObstacle()
    } 
 
});

// onload start game 
window.onload = function() {
backgroundImage.onload = function() {
	drawStartScreen ();
}
 if (backgroundImage.complete) {
        drawStartScreen();
    }
};

// start screen
function drawStartScreen () {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "40px Times New Roman";
    ctx.fillText("START GAME", canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = "20px Times New Roman"; // smaller font
    ctx.fillText("Press Enter to start", canvas.width / 2 - 100, canvas.height / 2 + 50); // +50 puts it below
}

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


// glass of wine walking
function wineWalk() {
    if (isGameOver) {
        return wineBroken;
    }
    if (score===0&& wine.isOnGround) {
        return wineStand;
    }
    if (!wine.isOnGround) {
        return wineImages[imageIndex];
    }
    return wineImages[imageIndex];
}
