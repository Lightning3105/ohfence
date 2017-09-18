function player(colour, id){
    var width = 100
    var circle = game.make.bitmapData(width, width);
	circle.circle(width/2, width/2, width/2, colour);
	
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(200, 1400), game.rnd.integerInRange(200, 700), circle);
	this.anchor.set(0.5, 0.5)

    this.ID = id

    this.speed = {x:0, y:0}

    this.cooldown = 0

    var s = new sword()
    this.addChild(s)
    v.swords.push(s)
}

player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;
player.prototype.update = function() {
    if (this.cooldown == 0){
        this.x += this.speed.x
        this.y += this.speed.y
        this.rotation = Math.atan2(this.speed.y - 0, this.speed.x - 0) + Math.PI/2;
    }

    v.swords.forEach(function(s){
        if (s != this.children[0]){
            if(Phaser.Rectangle.intersects(s.getBounds(), this.children[0].getBounds()) && this.cooldown == 0){
                //s.parent.x += this.speed.x
                //s.parent.y += this.speed.y
                //this.x -= this.speed.x
                //this.y -= this.speed.y
                game.add.tween(s.parent).to({x:s.parent.x + this.speed.x * 50, y:s.parent.y + this.speed.y * 100}, 500).start()
                game.add.tween(this).to({x:this.x - this.speed.x * 50, y:this.y - this.speed.y * 100}, 500).start()
                s.parent.cooldown = 100
                //console.log(this.x, this.x - this.speed.x * 400)
                this.cooldown = 100
            }
        }
    }.bind(this))

    if (this.cooldown > 0){
        this.cooldown--
    }
}
player.prototype.move = function(speed) {
    this.speed.x = -speed.x / 20
    this.speed.y = -speed.y / 20
}

function sword() {
    var rect = game.make.bitmapData(40, 60);
    rect.rect(15, 0, 10, 60, "#000000")

    Phaser.Sprite.call(this, game, 0, -50, rect);
	this.anchor.set(0.5, 1)
}

sword.prototype = Object.create(Phaser.Sprite.prototype);
sword.prototype.constructor = sword;
sword.prototype.update = function() {}
