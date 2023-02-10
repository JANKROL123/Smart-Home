const mqtt = require("async-mqtt");
class SecurityAlarm {
    constructor() {
        this.client = null;
        this.id = "security-alarm-single";
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        }
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await this.client.subscribe("check");
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case "check":
                    parseFloat(message) < 0.05
                    ? this.client.publish("alarm", "alarm")
                    : this.client.publish("alarm", "no alarm");
                    break;
            }
        })
    }
    async onExit() {
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = SecurityAlarm;