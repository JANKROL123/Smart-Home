const mqtt = require("async-mqtt");
const {sample} = require("lodash");
class FertilizeSystem {
    constructor(place) {
        this.client = null;
        this.place = place;
        this.id = `fertilize-system-${place}`;
        this.fertilizersRate = 0.1;
        this.fertilizerAmplitudes = [-0.01, 0.01];
        this.innerInterval = null;
        this.amplitude = 0.05
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false,
            ampFunctions: true,
            amplitude: this.amplitude
        };
    }
    setAmplitude(amp) {
        this.amplitude = amp;
    }
    handleFertilizer(message) {
        if (message === "down") this.fertilizersRate -= this.amplitude;
        else if (message === "up") this.fertilizersRate += this.amplitude;
        this.fertilizersRate = Math.max(0, Math.min(1, this.fertilizersRate));
    }
    fertilizerMonitor() {
        this.fertilizersRate += sample(this.fertilizerAmplitudes);
        this.fertilizersRate = Math.max(0, Math.min(1, this.fertilizersRate));
        this.client.publish(`fertilizers/${this.place}`, this.fertilizersRate.toString());
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await this.client.subscribe(`gardensystem/fertilizers/${this.place}`);
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case `gardensystem/fertilizers/${this.place}`:
                    this.handleFertilizer(message.toString());
                    break;
            }
        });
        this.innerInterval = setInterval(() => this.fertilizerMonitor(), 1000);
    }
    async onExit() {
        clearInterval(this.innerInterval);
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = FertilizeSystem;