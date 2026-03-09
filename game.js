velocityY -= jumpForce;
velocityY += gravity;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && player.isOnGround) {
        player.velocityY = -20; // Adjust jump hight)
    }
