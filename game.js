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

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && player.isOnGround) {
        player.velocityY = -15; // Adjust jump hight)
        const gravity = 0.6; // gravity
        player.isOnGround = false;
        player.velocityY += gravity; // gravity pulls down player after jump
        player.y = player.velocityY; // speed player moves
    }

if (player.y >= groundY) { // >= since happens when player below ground level since top of screen 0 and towards buttom higher number y 
    player.y = groundY; // reset player to ground level
    player.velocityY = 0
    player.isOnGround = true; 
}

    if (!player.isOnGround) {
    airtime += 1
    }


