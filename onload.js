function gameObj() {
    this.height = 480;
    this.width = 640;
    
    this.color = "White";
    this.HTMLObj = document.getElementById("gameFrame");
    
    this.init = function() {
        this.HTMLObj.style["height"] = this.height;
        this.HTMLObj.style["width"] = this.width;
        this.HTMLObj.style["background-color"] = this.color;
    }
}

function playerObj() {
    this.startingHealth = 100;
    this.health = this.startingHealth;
    
    this.x = 0;
    this.y = 0;
    this.height = 40;
    this.width = 40;
    
    this.color = "Red";
    this.HTMLObj = document.getElementById("player");
    
    this.init = function() {
        this.HTMLObj.style["background-color"] = this.color;
        
        this.HTMLObj.style["height"] = this.height;
        this.HTMLObj.style["width"] = this.width;
        
        this.HTMLObj.style["left"] = this.x;
        this.HTMLObj.style["top"] = this.y;
    }
}


function start() {
    var game = new gameObj();
    game.init();
    
    var player = new playerObj();
    player.init();
}

start();