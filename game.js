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


    
    }