// === Variables === \\ 
var keysDown = {
    arrow_left:  false,
    arrow_right: false,
    arrow_up:    false,
    arrow_down:  false,
    
    spacebar:    false,
};



// === Objects ==== \\
function gameObj() {
    // Variables
    this.gravity = 1000; // The gavity, 1000=default
    this.speed = 1; // Speed of the game, 1=default
    
    // Init Variables
    this.height = 480;
    this.width = 640;
    this.color = "White";
    this.HTMLObj = document.getElementById("gameFrame");
    
    // Functions
    this.keyDown = function(key) {
        switch(key.code) {
            case "ArrowLeft":
                keysDown["arrow_left"] = true;
                break;
            case "ArrowRight":
                keysDown["arrow_right"] = true;
                break;
            case "ArrowUp":
                keysDown["arrow_up"] = true;
                break;
            case "ArrowDown":
                keysDown["arrow_down"] = true;
                break;
            case "Space":
                keysDown["spacebar"] = true;
                break;
        }
    }
    
    this.keyUp = function(key) {
        switch(key.code) {
            case "ArrowLeft":
                keysDown["arrow_left"] = false;
                break;
            case "ArrowRight":
                keysDown["arrow_right"] = false;
                break;
            case "ArrowUp":
                keysDown["arrow_up"] = false;
                break;
            case "ArrowDown":
                keysDown["arrow_down"] = false;
                break;
            case "Space":
                keysDown["spacebar"] = false;
                break;
        }
    }
    
    // Init
    this.init = function() {
        this.HTMLObj.style["height"] = this.height;
        this.HTMLObj.style["width"] = this.width;
        this.HTMLObj.style["background-color"] = this.color;
        document.onkeydown = this.keyDown;
        document.onkeyup = this.keyUp;
    }
}

function playerObj() {
    // Variables
    this.startingHealth = 100;
    this.health = this.startingHealth;
    
    // Init Variables
    this.x = 0;
    this.y = 0;
    this.speed = 200; // How much pixels the player should move per second.
    this.force = 0; // gravity
    this.jumpForce = 500;
    this.height = 40;
    this.width = 40;
    this.color = "Red";
    this.HTMLObj = document.getElementById("player");
    
    // Functions
    
    // Init
    this.init = function() {
        this.HTMLObj.style["background-color"] = this.color;
        
        this.HTMLObj.style["height"] = this.height;
        this.HTMLObj.style["width"] = this.width;
        
        this.HTMLObj.style["left"] = this.x;
        this.HTMLObj.style["top"] = this.y;
    }
}



// === Functions === \\
function collisionCheck(x, y) {
    if(y > game.height - player.height) {
        y = game.height - player.height;
    }
    
    if(x==NaN)x=player.x; // Failsafe
    if(y==NaN)y=player.y; // Failsafe
    
    return {x, y};
}

function onGround(x, y) {
    if(collisionCheck(x, Math.floor(y)+1).y < Math.floor(player.y)+1) {
        return true;
    } else {
        return false;
    }
}

function hittingRoof(x, y) {
    if(collisionCheck(x, Math.floor(y)-1).y < Math.floor(player.y)-1) {
        return true;
    } else {
        return false;
    }
}

function applyGravity(speed) {
    // Still have to add enemies in here (when they are added)!
    
    // Apply the force
    player.force += (game.gravity * game.speed)*speed;
    
    // If they are on the ground and there is a downwards force
    if(onGround(player.x, player.y) && player.force >= 0) {
        player.force = 0;
    }
    
    // If they are hitting a roof and there is an upwards force
    if(hittingRoof(player.x, player.y) && player.force < 0) {
        player.force = 0;
    }
    
    // Apple the positioning
    var newY = player.y + (player.force * speed);
    player.y = collisionCheck(player.x, newY).y;
}

function handleJumping(speed) {
    if(keysDown.arrow_up || keysDown.spacebar) {
        if(collisionCheck(player.x, player.y+1).y < player.y+1) { // If on top of something
            player.force = -player.jumpForce;
        }
    }
}



// === Main ==== \\
var game = new gameObj();
var player = new playerObj();

function start() {
    game.init();
    player.init();
}

function tick(speed) { // 1speed=1sec 0.5speed=2sec 4speed=0.25sec
    applyGravity(speed);
    
    // Input / Output  -- temporary until gravity has been added
    if(keysDown.arrow_right) {
        player.x = collisionCheck(player.x + (player.speed * speed * game.speed), player.y).x;
    }
    if(keysDown.arrow_left) {
        player.x = collisionCheck(player.x - (player.speed * speed * game.speed), player.y).x;
    }
    
    handleJumping(speed);
    
    // Rendering
    player.init();
}



// === Run the game === \\
start();

// This chunk of code will calculate how long it took the previous tick() to take and pass it in the current one. tick(nextSpeed)
var nextSpeed = 0;
var startDate = new Date();
var startTime = startDate.getMilliseconds();

setInterval(function() {
    tick(nextSpeed);
    var endDate = new Date();
    var endTime = endDate.getMilliseconds();
    var timeTaken;
    
    if(startTime > endTime) { // In case startTime=998 and endTime=4 or a similar case
        timeTaken = (endTime + 1000) - startTime;
    } else {
        timeTaken = endTime - startTime;
    }
    
    //console.log(1000 / timeTaken);
    
    nextSpeed = timeTaken / 1000;
    startDate = new Date();
    startTime = startDate.getMilliseconds();
}, 1)