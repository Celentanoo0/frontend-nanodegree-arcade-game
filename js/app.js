function Creature(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

function Enemy(x, y, speed) {
    Creature.call(this, "images/enemy-bug.png", x, y);
    this.speed = speed;
    this.width = 60;
    this.heigth = 20;
}
Enemy.prototype = Object.create(Creature.prototype)
Object.defineProperty(Enemy.prototype, "constructor", {
    value: Enemy,
    enumerable: false,
    writable: true,
});

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > random(500, 700)) {
        this.x = random(-500, -100);
    }
    if (
        this.x + this.width > player.x &&
        player.x > this.x - this.width &&
        this.y + this.heigth > player.y &&
        player.y > this.y - this.heigth
    ) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.velX = 100;
    this.velY = 80;
}

Player.prototype.update = function () {
    //
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (e) {
    if (e === "left") {
        if (this.x - this.velX > -10) {
            this.x -= this.velX;
        }
    } else if (e === "up") {
        if (this.y - this.velY > -30) {
            this.y -= this.velY;
        }
        if (this.y < 0) {
            player.reset();
        }
    } else if (e === "right") {
        if (this.x + this.velX < 500) {
            this.x += this.velX;
        }
    } else if (e === "down") {
        if (this.y + this.velY < 400) {
            this.y += this.velY;
        }
    }
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
};

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
while (allEnemies.length < 6) {
    const enemyTop = new Enemy(random(-500,-100), 60, random(120,500));
    const enemyMiddle = new Enemy(random(-500, -100), 140, random(120, 500));
    const enemyBottom = new Enemy(random(-500,-100), 220, random(120,500));
    allEnemies.push(enemyTop, enemyMiddle, enemyBottom);
}
const player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        KeyA: "left",
        KeyW: "up",
        KeyD: "right",
        KeyS: "down",
    };

    player.handleInput(allowedKeys[e.code]);
});
