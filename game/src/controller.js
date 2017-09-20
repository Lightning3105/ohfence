var controller = function(game) {}

controller.prototype = {
	create: function() {
		Phaser.Stage.backgroundColor = "#ffffaa"
        holder = game.add.image(350, 360, "controller/holder")
        holder.anchor.set(0.5, 0.5)
        holder.width = 500
        holder.height = 500
        this.server = null

        this.stick = game.add.sprite(350, 360, "controller/stick")
        this.stick.anchor.set(0.5, 0.5)
        this.stick.width = 200
        this.stick.height = 200

        game.input.maxPointers = 2
        this.speed = {x:0, y:0}
        this.init = new Phaser.Point(0, 0)

        this.movePointer = null
        this.hubUNID = null
        this.ID

        game.input.onDown.add(function(pointer){
            if (pointer.x < 640){
                this.movePointer = pointer
            }
        }.bind(this))

        document.getElementById("overlay").innerHTML = "<p>Type in your connection code: <input id='incode' type='number'></input><button id='go'>Go</button></p>"

        document.getElementById("go").onclick = function(){
            instance = document.getElementById("incode").value
            this.server = new Server("00017816b8d47b6ab5b1fe44f482414dae8b19e1069bbcba6ece@multipyer")
            this.server.connect("GS02ec3c", instance)
        }.bind(this)
	},

    render: function(){
        //game.debug.inputInfo(32, 32);
        //game.debug.pointer( game.input.activePointer );
    },

	update: function() {
        if (this.movePointer != null){
            if (this.movePointer.isUp) {
                this.movePointer = null
            }
            var initialPoint = new Phaser.Point(350, 360)
            var maxDistanceInPixels = 200

            var d=initialPoint.distance(game.input.pointer1.position);

            var deltaX=this.input.pointer1.position.x-initialPoint.x;
            var deltaY=this.input.pointer1.position.y-initialPoint.y;

            var angle = initialPoint.angle(game.input.pointer1.position);


            if (d>maxDistanceInPixels) {
                deltaX = (deltaX===0) ? 0 : Math.cos(angle) * maxDistanceInPixels;
        deltaY = (deltaY===0)? 0 : Math.sin(angle) * maxDistanceInPixels;
            }

            this.speed.x = parseInt((deltaX/maxDistanceInPixels) * 100 * -1, 10);
            this.speed.y = parseInt((deltaY/maxDistanceInPixels) * 100 * -1, 10);

            if (this.hubUNID != null){
                this.server.send({action: this.server.locals.SEND, target: this.hubUNID, key: this.ID, value: {speed: this.speed}})
            }
            

            this.stick.x = 350+(deltaX);
            this.stick.y = 360+(deltaY);
        }
        else{
            this.stick.x = 350
            this.stick.y = 360
            if (this.hubUNID != null){
                this.server.send({action: this.server.locals.SEND, target: this.hubUNID, key: this.ID, value: {speed: {x:0, y:0}}})
            }
        }

        if (this.server != null){
            while (this.server.received.length > 0){
                data = this.server.received.pop()
                if (data.action == this.server.locals.SEND){
                    if (data.key == "colour"){
                        console.log(data.value)
                        game.stage.backgroundColor = data.value
                        this.ID = data.ID
                        document.getElementById("overlay").innerHTML = ""
                        this.hubUNID = data.origin
                    }
                }
            }
        }
		
	},
}