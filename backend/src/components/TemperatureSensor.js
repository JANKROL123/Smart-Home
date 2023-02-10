const mqtt = require("async-mqtt");
const {sample} = require("lodash");
class TemperatureSensor {
    constructor(room) {
        this.client = null;
        this.room = room;
        this.id = `temperature-sensor-${room}`;
        this.temperature = 30;
        this.temperatureAmplitudes = [-1.5, -1, -0.5, 0, 0.5, 1, 1.5];
        this.innerInterval = null;
        this.amplitude = 10;
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
    extremeTemperature(msg) {
        if (msg === "down") this.temperature -= this.amplitude;
        else if (msg === "up") this.temperature += this.amplitude;
    }
    updateTemperature() {
        this.temperature += sample(this.temperatureAmplitudes);
        this.client.publish(`temperature/${this.room}`, this.temperature.toString());
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        await Promise.all([
            this.client.subscribe(`heat/${this.room}`),
            this.client.subscribe("fire")
        ]); 
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case `heat/${this.room}`:
                    this.extremeTemperature(message.toString());
                    break;
                case "fire":
                    this.temperature = 20;
                    break;
            }
        });
        this.innerInterval = setInterval(() => this.updateTemperature(), 1000);
    }
    async onExit() {
        clearInterval(this.innerInterval);
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = TemperatureSensor;