const mqtt = require("async-mqtt");
class GardenManagementSystem {
    constructor() {
        this.client = null;
        this.id = "garden-management-system-single";
        this.highWater = 0.6;
        this.lowWater = 0.2;
        this.highFertilizers = 0.15;
        this.lowFertilizers = 0.05;
    }
    getParams() {
        return {
            id: this.id,
            highWater: this.highWater, 
            lowWater: this.lowWater,
            lowFertilizers: this.lowFertilizers,
            highFertilizers: this.highFertilizers,
            setFunctions: true
        };
    }
    setHighWater(high) {
        this.highWater = high;
    }
    setLowWater(low) {
        this.lowWater = low;
    }
    setHighFertilizers(high) {
        this.highFertilizers = high;
    }
    setLowFertilizers(low) {
        this.lowFertilizers = low;
    }
    handleMoisture(place, message) {
        if (message > this.highWater) this.client.publish(`gardensystem/water/${place}`, "down");
        else if (message < this.lowWater) this.client.publish(`gardensystem/water/${place}`, "up");
    }
    handleFertilizers(place, message) {
        if (message > this.highFertilizers) this.client.publish(`gardensystem/fertilizers/${place}`, "down");
        else if (message < this.lowFertilizers) this.client.publish(`gardensystem/fertilizers/${place}`, "up");
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await Promise.all([
            this.client.subscribe("water/+"),
            this.client.subscribe("fertilizers/+")
        ]);
        this.client.on("message", (topic, message) => {
            if (topic.startsWith("water/")) {
                const place = topic.slice(6);
                this.handleMoisture(place, parseFloat(message));
            } else if (topic.startsWith("fertilizers/")) {
                const place = topic.slice(12);
                this.handleFertilizers(place, parseFloat(message));
            }
        });
    }
    async onExit() {
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = GardenManagementSystem;