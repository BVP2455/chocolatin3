// For canvas
const background = document.getElementById("background");
const context = background.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "pictures/background inspirational wonderful.png";

backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0,0, background.width, background.height);
};


velocityY -= jumpForce;
velocityY += gravity;

// game loop 
function gameLoop() {
    wine.x += gravity; // move player by gravity
    wine.y += wine.velocityY; // move player by velocity
    
    if (wine.y >= groundY) { // >= since happens when player below ground level since top of screen 0 and towards buttom higher number y 
    wine.y = groundY; // reset player to ground level
    wine.velocityY = 0
    wine.isOnGround = true; }
    
    if (!wine.isOnGround) {
    airtime += 1 
     } else { 
    airtime = 0; }

    requestAnimationFrame(gameLoop);
}



document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && player.isOnGround) {
        player.velocityY = -15; // Adjust jump hight)
        const gravity = 0.6; // gravity
        wine.isOnGround = false;
        wine.velocityY += gravity; // gravity pulls down player after jump
        wine.y = wine.velocityY; // speed player moves
    }


<<<<<<< HEAD
    
    }
=======
    if (!player.isOnGround) {
    airtime += 1
    }


>>>>>>> 006328cf7182f346ba362c462eb49ef4a8b3d06e
