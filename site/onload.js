// === Variables === \\
var objects = new Array();
var platformID = 0; // The ID of the next platform
var platformObjects = document.getElementById("platformObjects");

var keysDown = {
    arrow_left:  false,
    arrow_right: false,
    arrow_up:    false,
    arrow_down:  false,
    
    spacebar:    false,
    
    key_w: false,
    key_a: false,
    key_s: false,
    key_d: false,
};



// ==== Events ==== \\
keyDown = function(key) {
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
        case "KeyW":
            keysDown["key_w"] = true;
            break;
        case "KeyA":
            keysDown["key_a"] = true;
            break;
        case "KeyS":
            keysDown["key_s"] = true;
            break;
        case "KeyD":
            keysDown["key_d"] = true;
            break;
    }
}
    
keyUp = function(key) {
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
        case "KeyW":
            keysDown["key_w"] = false;
            break;
        case "KeyA":
            keysDown["key_a"] = false;
            break;
        case "KeyS":
            keysDown["key_s"] = false;
            break;
        case "KeyD":
            keysDown["key_d"] = false;
        break;
    }
}

document.onkeydown = this.keyDown;
document.onkeyup = this.keyUp;



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
    
    // Init
    this.init = function() {
        this.HTMLObj.style["height"] = this.height;
        this.HTMLObj.style["width"] = this.width;
        this.HTMLObj.style["background-color"] = this.color;
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
    
    // Init
    this.init = function() {
        this.HTMLObj.style["background-color"] = this.color;
        
        this.HTMLObj.style["height"] = this.height;
        this.HTMLObj.style["width"] = this.width;
        
        this.HTMLObj.style["left"] = this.x;
        this.HTMLObj.style["top"] = this.y;
    }
}

function platformObj() {
    this.x = 0;
    this.y = 0;
    
    this.height = 20;
    this.width = 120;
    this.color = "Black";
    this.HTMLObj;
    this.platformName;
    
    // Make the platform
        platformName = "platform_" + platformID;
        var insertCode = "<div id=\"" + platformName + "\" class=\"platform\"></div>"

        platformObjects.innerHTML = platformObjects.innerHTML + insertCode + "\n";
        HTMLObj = document.getElementById(platformName);
        
        objects[platformID] = this; // Add the object in the objects array, each platformID should be unique and start with 0
        
        platformID++;
    // End making the platform
    
    this.init = function() {
        HTMLObj.style["background-color"] = this.color;
        
        HTMLObj.style["height"] = this.height;
        HTMLObj.style["width"] = this.width;
        
        HTMLObj.style["left"] = this.x;
        HTMLObj.style["top"] = this.y;
    }
}



// === Functions === \\
function collisionCheck(x, y) {
    if(y > game.height - player.height) {
        y = game.height - player.height;
    }
    
    for(i=0; i<objects.length; i++) {
        var obj = objects[i];
        
        if((Number(y) + Number(player.height)) > Number(obj.y)) { // If the player is lower than the top platform
           if(Number(y) < (Number(obj.y) + Number(obj.height))) { // If the player is higher than the bottom of the platform
               if((Number(x) + Number(player.width)) > Number(obj.x)) { // If the player is right to the left of the platform
                   if(Number(x) < (Number(obj.x) + Number(obj.width))) { // If the player is left to the right of the platform
                       if((player.y + player.height) - obj.height/2 < obj.y) { // If the player is on top
                           y = obj.y - player.height;
                       }
                       if(player.y + obj.height/2 > obj.y + obj.height) { // If the player is at the bototm
                           y = obj.y + obj.height;
                       }
                   }
               }
           }
        }
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
    var newY = player.y + (player.force * speed * game.speed);
    player.y = collisionCheck(player.x, newY).y;
}

function handleJumping(speed) {
    if(keysDown.arrow_up || keysDown.spacebar || keysDown.key_w) {
        if(collisionCheck(player.x, player.y+1).y < player.y+1) { // If on top of something
            player.force = -player.jumpForce;
        }
    }
}



// === Main ==== \\
var game = new gameObj();
var player = new playerObj();
var tmp_testplatform = new platformObj();

function start() {
    game.init();
    player.init();
    tmp_testplatform.x = 200; // tmp
    tmp_testplatform.y = 400; // tmp
    tmp_testplatform.init();  // tmp
}

function tick(speed) { // 1speed=1sec 0.5speed=2sec 4speed=0.25sec
    applyGravity(speed);
    
    // Input / Output  -- temporary until gravity has been added
    if(keysDown.arrow_right || keysDown.key_d) {
        player.x = collisionCheck(player.x + (player.speed * speed * game.speed), player.y).x;
    }
    if(keysDown.arrow_left || keysDown.key_a) {
        player.x = collisionCheck(player.x - (player.speed * speed * game.speed), player.y).x;
    }
    
    handleJumping(speed);
    
    // Rendering
    player.init();
    
    // Temporary test platform
    tmp_testplatform.init();
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