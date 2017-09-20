var title = function(game) {}

title.prototype = {
	create: function() {
		Phaser.Stage.backgroundColor = "#ffffff"

		this.players = game.add.group()
		this.colours = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "4b0082", "a0522d"]

		v.swords = []

		v.server = new Server("00017816b8d47b6ab5b1fe44f482414dae8b19e1069bbcba6ece@multipyer")
        v.server.connect("GS02ec3c")

		this.ids = 0

		colour = this.colours[0]
		p = new player(colour, 1)
		this.players.add(p)
	},

	render: function(){
		//v.swords.forEach(function(s){
        //	game.debug.geom(s.getBounds(), '#eeffff')
		//})
	},

	update: function() {

		if (v.server.instanceID != null){
			document.getElementById("code").innerHTML = v.server.instanceID
		}

		while (v.server.received.length > 0){
			data = v.server.received.pop()
			if (data.action == v.server.locals.CLIENTJOIN){
				ind = game.rnd.integerInRange(0, this.colours.length - 1)
				colour = this.colours.splice(ind, 1)[0]
				p = new player(colour, this.ids)
				this.players.add(p)
				d = {action: v.server.locals.SEND, target:data.unid, value: colour, key: "colour", ID:this.ids}
				this.ids++
				v.server.send(d)
			}

			if (data.action == v.server.locals.SEND){
				this.players.forEach(function(e) {
					if (e.ID == data.key){
						var p = e
					}
				}, this);

				p.move(data.value.speed)
			}
		}
		
	},
}