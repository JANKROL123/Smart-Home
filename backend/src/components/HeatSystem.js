const mqtt = require("async-mqtt");
class HeatSystem {
    constructor (room) {
        this.client = null;
        this.id = `heat-system-${room}`;
        this.room = room;
        this.high = 40;
        this.low = 20;
    }
    getParams() {
        return {
            id: this.id,
            high: this.high, 
            low: this.low,
            setFunctions: true
        };
    }
    setHigh(high) {
        this.high = high;
    }
    setLow(low) {
        this.low = low;
    }
    handleHeat(temperature) {
        if (parseFloat(temperature) > this.high) this.client.publish(`heat/${this.room}`, "down");
        else if (parseFloat(temperature) < this.low) this.client.publish(`heat/${this.room}`, "up");
    }
    async onInit() {
        if (this.client) return;
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await this.client.subscribe(`temperature/${this.room}`);
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case `temperature/${this.room}`:
                    this.handleHeat(message);
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
module.exports = HeatSystem;