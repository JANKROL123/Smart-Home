const mqtt = require("async-mqtt");
class InternetSwitch {
    constructor () {
        this.client = null;
        this.id = "internet-switch-single";
        this.internetOn = false;
        this.presenceCache = {};
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        }
    }
    checkPresenceInRoom(room, anyoneIn) {
        this.presenceCache[room] = anyoneIn;
        const isSomeoneIn = Object.values(this.presenceCache).some(n => n === true)
        this.internetOn = isSomeoneIn;
        this.client.publish("internet", this.internetOn.toString());
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await this.client.subscribe("presence/+");
        this.client.on("message", (topic, message) => {
            const room = topic.slice("presence/".length);
            const messageAsString = message.toString();
            this.checkPresenceInRoom(
                room,
                {"true": true, "false": false}[messageAsString]
            );
        });
    }
    async onExit() {
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = InternetSwitch;