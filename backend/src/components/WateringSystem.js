const mqtt = require("async-mqtt");
const {sample} = require("lodash");
class WateringSystem {
    constructor(place) {
        this.client = null;
        this.place = place;
        this.id = `watering-system-${place}`;
        this.moistureContent = 0.4;
        this.moistureAmplitudes = [-0.03, -0.02, -0.01, 0.01, 0.02, 0.03];
        this.innerInterval = null;
        this.amplitude = 0.2
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false,
            ampFunctions: true,
            amplitude: this.amplitude
        }
    }
    setAmplitude(amp) {
        this.amplitude = amp;
    }
    handleWater(msg) {
        if (msg === "down") this.moistureContent -= this.amplitude;
        else if (msg === "up") this.moistureContent += this.amplitude;
    }
    handleMoisture() {
        this.moistureContent += sample(this.moistureAmplitudes);
        this.client.publish(`water/${this.place}`, this.moistureContent.toString());
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await Promise.all([
            this.client.subscribe("rain"),
            this.client.subscribe(`gardensystem/water/${this.place}`)
        ]);
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case "rain":
                    if (message.toString() === "true") {
                        this.moistureContent += 0.05;
                    }
                    break;
                case `gardensystem/water/${this.place}`:
                    this.handleWater(message.toString());
                    break;
            }
        });
        this.innerInterval = setInterval(() => this.handleMoisture(), 1000);
    }
    async onExit() {
        clearInterval(this.innerInterval);
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = WateringSystem;