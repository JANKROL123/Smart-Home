const mqtt = require("async-mqtt");
class WindowsOpeningSystem {
    constructor(room) {
        this.client = null;
        this.room = room;
        this.id = `windows-opening-system-${room}`;
        this.windowsOpen = false;
    }
    getParams() {
        return {
            id: this.id,
            setFunctions: false
        }
    }
    windowsOpenClose(temp) {
        parseFloat(temp) > 35
        ? this.windowsOpen = true
        : this.windowsOpen = false;
        this.client.publish(`windows/${this.room}`, this.windowsOpen.toString());
    }
    async onInit() {
        this.client = await mqtt.connectAsync("mqtt://localhost:1883");
        this.client.publish(`windows/${this.room}`, "false");
        await Promise.all([
            this.client.subscribe(`temperature/${this.room}`),
            this.client.subscribe("rain")
        ]);
        this.client.on("message", (topic, message) => {
            switch (topic) {
                case "rain":
                    if (message.toString() === "true") {
                        this.windowsOpen = false;
                        this.client.publish(`windows/${this.room}`, "false");
                    }
                    break;
                case `temperature/${this.room}`:
                    this.windowsOpenClose(message);
            }
        })
    }
    async onExit() {
        if (!this.client) return;
        await this.client.end();
        this.client = null;
    }
}
module.exports = WindowsOpeningSystem;