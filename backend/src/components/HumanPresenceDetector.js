const mqtt = require("async-mqtt");
class HumanPresenceDetector {
    constructor(room) {
        this.client = null;
        this.room = room;
        this.id = `human-presence-detector-${room}`;
        this.humanPresence = false;
        this.innerInterval = null;
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        }
    }
    detectHumanPresence() {
        const random = Math.random();
        random < 0.4
        ? this.humanPresence = true
        : this.humanPresence = false;
        this.client.publish("check", random.toString());
        this.client.publish(`presence/${this.room}`, this.humanPresence.toString());
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await this.client.subscribe("fire");
        this.client.on("message", (topic, _message) => {
            switch(topic) {
                case "fire":
                    this.humanPresence = false;
                    break;
            }
        });
        this.innerInterval = setInterval(() => this.detectHumanPresence(), 1000);
    }
    async onExit() {
        clearInterval(this.innerInterval);
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = HumanPresenceDetector;