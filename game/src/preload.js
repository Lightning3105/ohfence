var pre_preload = function(game) {}

pre_preload.prototype = {
	preload: function() {
		game.stage.backgroundColor = "#ffffff"
	},
	create: function() {
		this.game.state.start("Preload");
	}
}

var preload = function(game) {}

preload.prototype = {
	preload: function() {
		if (v.mobile){
			game.load.image("controller/stick", "assets/images/controller/stick.png")
			game.load.image("controller/holder", "assets/images/controller/holder.png")

		}
		
	},
	create: function() {
		if (v.mobile){
			game.state.start("Controller");
		}
		else {
			game.state.start("Title");
		}
		
	}
}
