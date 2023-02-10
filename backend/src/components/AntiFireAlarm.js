const mqtt = require("async-mqtt");
class AntiFireAlarm {
    constructor() {
        this.client = null;
        this.id = "anti-fire-alarm-single";
        this.innerInterval = null;
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        };
    }
    detectFire() {
        const random = Math.random();
        random < 0.01
        ? this.client.publish("fire", "evacuation")
        : this.client.publish("fire", "no fire");
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        this.innerInterval = setInterval(() => this.detectFire(), 1000);
    }
    async onExit() {
        clearInterval(this.innerInterval);
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = AntiFireAlarm;