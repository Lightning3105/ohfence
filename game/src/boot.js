var boot = function(game) {
	console.log("%cStarting WoT Mortal God", "color:white; background:red");
};

boot.prototype = {
	preload: function() {},

	create: function() {
		game.forceSingleUpdate = true;
		if (this.game.device.desktop && this.game.device.pixelRatio == 2) {
			v.mobile = false
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.windowConstraints.bottom = "visual";
			this.scale.updateLayout();
			this.scale.refresh();
		} else {
			v.mobile = true
			game.gameWidth = 1280;
			game.gameHeight = 720;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = v.gameWidth / 2;
			this.scale.minHeight = v.gameHeight / 2;
			this.scale.maxWidth = v.gameWidth * 2.5;
			this.scale.maxHeight = v.gameHeight * 2.5;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.forceOrientation(true, false);
			this.scale.updateLayout();
			this.scale.refresh();
		}


		game.time.advancedTiming = true
		game.time.desiredFps = 60

		this.game.state.add("pre_preload", pre_preload)
		this.game.state.start("pre_preload");
	}
}
