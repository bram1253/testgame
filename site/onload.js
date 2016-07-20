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
    this.FPS = 30; // Frames per second, default=30
    
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


// Main
var game = new gameObj();
var player = new playerObj();

function start() {
    game.init();
    player.init();
}

function tick(speed) { // 1speed=1sec 0.5speed=2sec 4speed=0.25sec
    for(var i=0; i<10000000; i++){}
}

// Run the game
start();

// This chunk of code will calculate how long it took the previous tick() to take and pass it in the current one. tick(nextSpeed)
var nextSpeed = 1;

setInterval(function() {
    var startDate = new Date();
    var startTime = startDate.getMilliseconds();
    
    tick(nextSpeed);
    
    var endDate = new Date();
    var endTime = endDate.getMilliseconds();
    
    
    var timeTaken;
    if(startTime > endTime) { // In case startTime=998 and endTime=4 or a similar case
        timeTaken = (endTime + 1000) - startTime;
    } else {
        timeTaken = endTime - startTime;
    }
    
    nextSpeed = 1000/timeTaken;
    // 1 sec (1000ms) / timeTaken
    // timeTaken is in milliseconds how long it took to complete one tick()
}, 1)