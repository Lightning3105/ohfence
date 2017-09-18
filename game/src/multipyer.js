function Server(address){
    this.address = address
    this.socket = null
    this.userSecret = null
    this.gsecret = null
    this.unid = null
    this.clients = []
    this.instanceID = null
    this.connectInstance
    this.received = []
    this.locals = locals = {
        HANDSHAKE:  11,
        SET: 12,
        START: 13,
        AUTH: 14,
        QUEUE: 15,
        SEND: 16,
        ATTACHMENT: 17,
        CLIENTJOIN: 18,

        WAITING: 40,
        SUCCESS: 41,
        FAILURE: 42,
        DONE: 43,


        REG_TAKEN: 501,
        REG_ETAKEN: 502,
        INVALID_SECRET: 503,
    }

    return this
}

Server.prototype.connect = function(secret, instance){
    this.gsecret = secret
    this.connectInstance = instance || "n"
    a = this.address.split("@")
    this.userSecret = a[0]
    this.socket = new WebSocket('ws://multipyer.lightopa.com/server'); //

        // Log errors
    this.socket.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    }.bind(this);

    // Log messages from the server
    this.socket.onmessage = function (e) {
        data = JSON.parse(e.data)
        //console.log(data)
        if (data.action == this.locals.HANDSHAKE){
            this.unid = data.unid
            p = {"action": this.locals.AUTH, "user": this.userSecret, "server": this.gsecret, "instance": this.connectInstance}
            this.send(p)
        }

        else if (data.action == this.locals.START){
            this.clients = data.clients
            this.instanceID = data.instance
        }

        else if (data.action == this.locals.CLIENTJOIN){
            this.received.push(data)
            this.clients.push(data.unid)
        }

        else {
            this.received.push(data)
        }
    }.bind(this);

}

Server.prototype.send = function(data){
    data.origin = this.unid
    this.socket.send(JSON.stringify(data))
}