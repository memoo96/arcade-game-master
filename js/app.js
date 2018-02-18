// Enemies our player must avoid
'use strict';
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505)
     {
        this.x = 0;
     }

    // check collision between enemy and player
    if (player.y + 131 >= this.y + 90 && player.x + 25 <= this.x + 88 && player.y + 73 <= this.y + 135 && player.x + 76 >= this.x + 11)
    {
        player.x = 202.5;
        player.y = 383;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // stop player from moving outside of canvas wall boundaries
    if (this.y > 383 ) { this.y = 383; }
    if (this.x > 402.5) {this.x = 402.5;}
    if (this.x < 2.5) {this.x = 2.5;}
    
    // check for player reaching top of canvas and winning the game
    if (this.y <= 0) 
    {        
        this.x = 202.5;
        this.y = 383;
        // if player wins, add 1 to the score and level
        score += 1;
        level += 1;
        // pass score as an argument to raise difficulty function
        raise_difficulty(score);
    }

};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    display_score_level(score, level);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }else if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }else if (keyPress == 'right') {
        this.x += this.speed;
    }else{
        this.y += this.speed - 20;
    }
};

// function to show player's score
var display_score_level = function(score, level) {	
    var canvas = document.getElementsByTagName('canvas');
    score_level.innerHTML = 'Score: ' + score  + ' / ' + ' Level: ' + level ;
    document.body.insertBefore(score_level, canvas[0]);
};

// Increase number of enemies on screen based on player's score
var raise_difficulty = function(Enemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    // update new set of enemies
    var i = 0;
    while(i <= Enemies)
    {
		var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
        i++;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(202.5, 383, 50);
// Enemy randomly placed vertically within section of canvas
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
// Declare new score and game Level variables to store score and level
var score = 0;
var level = 1;
var score_level = document.createElement('div');
    score_level.style.color = "red";
    score_level.style.fontFamily = "Arial";
    
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});