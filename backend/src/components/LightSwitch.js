const mqtt = require("async-mqtt");
class LightSwitch {
    constructor(room) {
        this.client = null;
        this.room = room;
        this.id = `light-switch-${room}`;
        this.light = false;
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        }
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await this.client.subscribe(`presence/${this.room}`);
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case `presence/${this.room}`:
                    const random = Math.random();
                    message.toString() === "true" && random < 0.15
                    ? this.light = true
                    : this.light = false;
                    this.client.publish(`light/${this.room}`, this.light.toString());
                    break;
            }
        });
    }
    async onExit() {
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = LightSwitch;