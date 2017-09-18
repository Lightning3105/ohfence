var level = function(game) {}

level.prototype = {
	preload: function() {
		this.game.load.tilemap('tilemap', 'assets/levels/L1/map.csv', null, Phaser.Tilemap.CSV);
		this.game.load.spritesheet('tiles', 'assets/images/sloped-tiles.png', 64, 64);
		this.game.load.json('world', 'assets/levels/L1/world.json')

		//v.spells.lightning.object = new Lightning()
	},

	create: function() {
		background = game.add.image(0, 0, gradient(1280, 720, "#4E4FFF", "#00FDFF"))
		background.fixedToCamera = true

		layer_behind = game.add.group()

		terrain = game.add.image(0, 0, "level/1")
		terrain.width = 2000
		terrain.height = 720
		/*var t = game.add.sprite(0, 720, "level/1a")
		t.anchor.set(0, 1)
		var t = game.add.sprite(500, 720, "level/1b")
		t.anchor.set(0, 1)
		var t = game.add.sprite(1000, 720, "level/1c")
		t.anchor.set(0, 1)
		t.visible = false
		var t = game.add.sprite(1500, 720, "level/1d")
		t.anchor.set(0, 1)
		t.visible = false*/

		this.map = game.add.tilemap('tilemap', 25, 25);
		this.map.addTilesetImage('tiles');

		v.ground = this.map.createLayer(0);
		v.ground.resizeWorld();
		v.ground.visible = false
		//v.ground.debug = true
		game.world.setBounds(0, -150, game.world.width - 25, game.world.height + 120)

		this.game.slopes.convertTilemapLayer(v.ground, {
			1: 'FULL',
			2: 'HALF_BOTTOM_LEFT',
			3: 'HALF_BOTTOM_RIGHT',
			5: 'HALF_TOP_LEFT',
			4: 'HALF_TOP_RIGHT',
			14: 'QUARTER_BOTTOM_LEFT_LOW',
			15: 'QUARTER_BOTTOM_RIGHT_LOW',
			16: 'QUARTER_TOP_RIGHT_LOW',
			17: 'QUARTER_TOP_LEFT_LOW',
			18: 'QUARTER_BOTTOM_LEFT_HIGH',
			19: 'QUARTER_BOTTOM_RIGHT_HIGH',
			20: 'QUARTER_TOP_RIGHT_HIGH',
			21: 'QUARTER_TOP_LEFT_HIGH',
			22: 'QUARTER_LEFT_BOTTOM_HIGH',
			23: 'QUARTER_RIGHT_BOTTOM_HIGH',
			24: 'QUARTER_RIGHT_TOP_LOW',
			25: 'QUARTER_LEFT_TOP_LOW',
			26: 'QUARTER_LEFT_BOTTOM_LOW',
			27: 'QUARTER_RIGHT_BOTTOM_LOW',
			28: 'QUARTER_RIGHT_TOP_HIGH',
			29: 'QUARTER_LEFT_TOP_HIGH',
			30: 'HALF_BOTTOM',
			31: 'HALF_RIGHT',
			32: 'HALF_TOP',
			33: 'HALF_LEFT'
		});

		this.map.setCollisionBetween(1, 34, true, 0);

		game.physics.arcade.gravity.y = 250;
		game.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE

		v.people = game.add.group()
		v.people.add(new person(50))
		v.people.add(new person(150))
		v.people.add(new person(250))
		v.people.add(new person(350))

		layer_infront = game.add.group()
		var data = game.cache.getJSON('world');
		console.log(v.ground)
		for (i = 0; i < data.buildings.length; i++) {
			var skin = "building/" + data.buildings[i].type + "/" + data.buildings[i].key
			var spr = game.add.sprite(data.buildings[i].x, data.buildings[i].y, skin)
			spr.anchor.set(0.5, 0.5)
			layer_infront.add(spr)
			if (data.buildings[i].type == "bridge") {
				for (j = 0; j < data.buildings[i].tiles.length; j++) {
					v.ground.map.putTile(1, data.buildings[i].tiles[j].x, data.buildings[i].tiles[j].y)
				}
			}
		}

		var sht = game.add.sprite(data.shrine.x, data.shrine.y, "shrine/tower/1")
		sht.anchor.set(0.5, 1)
		sht.width = sht.height = data.shrine.size
		layer_behind.add(sht)

		var shd = game.add.sprite(data.shrine.x, data.shrine.y - 7, "shrine/door/1")
		shd.anchor.set(0.5, 1)
		shd.width = shd.width * (data.shrine.size / 800)
		shd.height = shd.height * (data.shrine.size / 800)
		layer_behind.add(shd)

		layer_spells = game.add.group()
		v.spells.lightning.object = new Lightning()
		layer_spells.add(v.spells.lightning.object)

		layer_gui = game.add.group()
		layer_gui.add(new spellButton(0))
	},

	update: function() {
		if (this.game.input.activePointer.isDown) {
			if (this.game.origDragPoint) {
				game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
			} // set new drag origin to current position
			this.game.origDragPoint = this.game.input.activePointer.position.clone();
		} else {
			this.game.origDragPoint = null;
		}
		game.camera.y = 0 - game.camera.x * (150 / 720)
	},

	render: function() {
		document.getElementById("debug").innerHTML = "FPS: " + game.time.fps +
			"<br>"

		//game.debug.body(v.ground, "#ff0000", true)
		//game.debug.bodyInfo(v.people, 32, 32);
	}
}
