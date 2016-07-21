var keysDown = {
    arrow_left:  false,
    arrow_right: false,
    arrow_up:    false,
    arrow_down:  false,
    
    spacebar:    false,
};

function gameObj() {
    // Variables
    this.gravity = 1; // The gavity, 1=default
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

//Functions
function collisionCheck(x, y) {
    if(y > game.height - player.height) {
        y = game.height - player.height;
    }
    
    return {x, y};
}

function applyGravity(speed) {
    // Still have to add enemies in here (when they are added)!
    if(collisionCheck(player.x, player.y+1).y < player.y+1) { // If on top of something
        player.force = 0;
    } else { // If not on top of something
        player.force += (game.gravity + (player.force*0.5))*speed*game.speed;
    }
    
    player.y = collisionCheck(player.x, player.y + player.force).y;
}

// Main
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
    if(keysDown.arrow_up) {
        player.y = collisionCheck(player.x, player.y - (player.speed * speed * game.speed)).y;
    }
    if(keysDown.arrow_down) {
        player.y = collisionCheck(player.x, player.y + player.speed * speed * game.speed).y;
    }
    
    // Rendering
    player.init();
}

// Run the game
start();

// This chunk of code will calculate how long it took the previous tick() to take and pass it in the current one. tick(nextSpeed)
var nextSpeed = 1;
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
    
    nextSpeed = timeTaken / 1000;
    startDate = new Date();
    startTime = startDate.getMilliseconds();
}, 1)