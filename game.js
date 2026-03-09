background = document.getElementById("background");
context = background.getContext("2d");



// Listen for when a key is pressed
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
}); 

velocityY -= jumpForce;
velocityY += gravity;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && player.isOnGround) {
        player.velocityY = -20; // Adjust jump hight)
    }
