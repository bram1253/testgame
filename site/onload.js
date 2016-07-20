function gameObj() {
    // Variables
    this.gravity = 1; // The gavity, 1=default
    this.speed = 1; // Speed of the game, 1=default
    this.FPS = 30; // Frames per second, default=30
    
    this.keysDown = {
        arrow_left:  false,
        arrow_right: false,
        arrow_up:    false,
        arrow_down:  false,
        
        spacebar:    false,
    };
    
    // Init Variables
    this.height = 480;
    this.width = 640;
    this.color = "White";
    this.HTMLObj = document.getElementById("gameFrame");
    
    // Functions
    function keyDown(key) {
        switch(key.code) {
            case "ArrowLeft":
                this.keysDown["arrow_left"] = true;
                break;
            case "ArrowRight":
                this.keysDown["arrow_right"] = true;
                break;
            case "ArrowUp":
                this.keysDown["arrow_up"] = true;
                break;
            case "ArrowDown":
                this.keysDown["arrow_down"] = true;
                break;
            case "Space":
                this.keysDown["spacebar"] = true;
                break;
        }
    }
    
    function keyUp(key) {
        switch(key.code) {
            case "ArrowLeft":
                this.keysDown["arrow_left"] = false;
                break;
            case "ArrowRight":
                this.keysDown["arrow_right"] = false;
                break;
            case "ArrowUp":
                this.keysDown["arrow_up"] = false;
                break;
            case "ArrowDown":
                this.keysDown["arrow_down"] = false;
                break;
            case "Space":
                this.keysDown["spacebar"] = false;
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

function loop(speed) { // speed: 60FPS=1, 30FPS=2, 120FPS=0.5
    
}

start();

while(true) {
    // Time calculation still has to be added, speed(1) is temporary
    loop(1);
}