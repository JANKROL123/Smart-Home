const mqtt = require("async-mqtt");
class RainDetector {
    constructor() {
        this.client = null;
        this.id = "rain-detector-single";
        this.innerInterval = null;
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        }
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        this.innerInterval = setInterval(() => {
            const random = Math.random();
            this.client.publish("rain", random < 0.2 ? "true" : "false");
        }, 1000);
    }
    async onExit() {
        clearInterval(this.innerInterval);
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = RainDetector;