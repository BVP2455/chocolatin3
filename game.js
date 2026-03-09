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

