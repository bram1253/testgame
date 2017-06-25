/*
    Copyright (C) 2016

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// === Variables === \\
var objects = new Array;
var platformID = 0; // The ID of the next platform

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


var canvas = document.getElementById("gameFrame");
var ctx    = canvas.getContext("2d");


function ClearScreen() {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0, game.width, game.height);
}

function DrawObjects() {
    for(var i=0; i<objects.length; i++) {
        var obj = objects[i];
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x-game.cameraX, obj.y-game.cameraY, obj.width, obj.height);
    }
}



// ==== Events ==== \\
function keyDown(key) {
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

function keyUp(key) {
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

document.onkeydown = keyDown;
document.onkeyup = keyUp;



// === Objects ==== \\
function gameObj() {
    // Variables
    this.logFPS = false;

    this.gravity = 1000; // The gavity, 1000=default
    this.speed = 1; // Speed of the game, 1=default

    this.cameraX = 0; // camera
    this.cameraY = 0; // camera
    this.cameraBorderX = 120; // At which point the camera will start to scroll on the X axis
    this.cameraBorderY = 20; // At which point the camera will start to scroll on the Y axis

    // Init Variables
    this.height = 480;
    this.width = 640;
    this.color = "rgb(255,255,255)";

    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
}

function playerObj() {
    objects[objects.length] = this;


    // Variables
    this.startingHealth = 100;
    this.health = this.startingHealth;

    // Init Variables
    this.spawnX = 260;
    this.spawnY = 280;
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.speed = 200; // How much pixels the player should move per second.
    this.force = 0; // gravity
    this.jumpForce = 500;
    this.height = 40;
    this.width = 40;
    this.color = "rgb(50,0,255)";
}

function platformObj() {
    objects[objects.length] = this;


    this.x = 0;
    this.y = 0;

    this.height = 20;
    this.width = 120;
    this.color = "rgb(0,0,0)";
}



// === Functions === \\
function collisionCheck(x, y) {
    var moveCameraX = 0;
    var moveCameraY = 0;

    if(y > game.height - player.height + game.cameraY) {
        y = game.height - player.height + game.cameraY;
    }
    if(x > game.width - player.height + game.cameraX - game.cameraBorderX) {
        moveCameraX = x - player.x;
        x = game.width - player.height + game.cameraX - game.cameraBorderX;
    }
    if(y < game.cameraY) {
        y = game.cameraY;
    }
    if(x < game.cameraX + game.cameraBorderX) {
        moveCameraX = x - player.x;
        x = game.cameraX + game.cameraBorderX;
    }

    for(var i=0; i<objects.length; i++) {
        var obj = objects[i];

        if((Number(y) + Number(player.height)) > Number(obj.y)) { // If the player is lower than the top platform
           if(Number(y) < (Number(obj.y) + Number(obj.height))) { // If the player is higher than the bottom of the platform
               if((Number(x) + Number(player.width)) > Number(obj.x)) { // If the player is right to the left of the platform
                   if(Number(x) < (Number(obj.x) + Number(obj.width))) { // If the player is left to the right of the platform
                       if(player.y < y) { // If the player is on top
                           y = obj.y - player.height;
                       }
                       if(player.y > y) {
                           y = obj.y + obj.height; // If the player is on the bottom
                       }
                       if(player.x < x) {
                           x = obj.x - player.width; // If the player is on the left
                       }
                       if(player.x > x) {
                           x = obj.x + obj.width; // if the player is on the right
                       }
                   }
               }
           }
        }
    }


    if(x==NaN) x=player.x; // Failsafe
    if(y==NaN) y=player.y; // Failsafe

    return {x, y, moveCameraX, moveCameraY};
}

function onGround(x, y) {
    if(collisionCheck(x, Math.floor(y)+1).y < Math.floor(player.y)+1) {
        return true;
    } else {
        return false;
    }
}

function hittingRoof(x, y) {
    if(collisionCheck(x, Math.floor(y)-1).y > Math.floor(player.y)-1) {
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
    tmp_testplatform.x = 200; // tmp
    tmp_testplatform.y = 400; // tmp
}

function tick(speed) { // 1speed=1sec 0.5speed=2sec 4speed=0.25sec
    var moveCameraX = 0;
    var moveCameraY = 0;

    applyGravity(speed);

    // Input / Output  -- temporary until gravity has been added
    if(keysDown.arrow_right || keysDown.key_d) {
        var movementTable = collisionCheck(player.x + (player.speed * speed * game.speed), player.y);
        moveCameraX = movementTable.moveCameraX;
        player.x = movementTable.x;
    }
    if(keysDown.arrow_left || keysDown.key_a) {
        var movementTable = collisionCheck(player.x - (player.speed * speed * game.speed), player.y);
        moveCameraX = movementTable.moveCameraX;
        player.x = movementTable.x;
    }

    handleJumping(speed);

    // Rendering
    //game.cameraX += moveCameraX;


    ClearScreen();
    DrawObjects();
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

    if(game.logFPS) {
        console.log(1000 / timeTaken);
    }

    nextSpeed = timeTaken / 1000;
    startDate = new Date();
    startTime = startDate.getMilliseconds();
}, 1);
