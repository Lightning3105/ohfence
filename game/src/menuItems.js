function gradient(width, height, colour1, colour2) {
	var background = this.game.add.bitmapData(width, height);
	var grd = background.context.createLinearGradient(0, 0, 0, width / 2);
	grd.addColorStop(0, colour1);
	grd.addColorStop(1, colour2);
	background.context.fillStyle = grd;
	background.context.fillRect(0, 0, this.game.width, this.game.height);
	return background
};

function black_fade(out, callback, time, colour, delay) {
	black = game.make.bitmapData(game.width, game.height)
	black.ctx.beginPath();
	black.ctx.rect(0, 0, game.width, game.height);
	black.ctx.fillStyle = colour || '#000000';
	black.ctx.fill();
	black = game.add.sprite(0, 0, black)
	black.fixedToCamera = true
	if (out) {
		black.alpha = 1
		t = game.add.tween(black).to({
			alpha: 0
		}, time || 1000, null, null, delay || 0).start();
	} else {
		black.alpha = 0
		t = game.add.tween(black).to({
			alpha: 1
		}, time || 1000, null, null, delay || 0).start();
	}
	if (callback != null) {
		t.onComplete.add(callback)
		t.onComplete.add(function() {
			black.destroy()
		}.bind(black))
	}
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.closePath();
	return this;
}

function randomInt(min, max) {
	out = Math.floor(Math.random() * (max - min + 1) + min);
	return out
}
