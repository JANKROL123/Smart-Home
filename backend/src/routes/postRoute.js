const express = require("express");
const messages = require("./messages/messages");
const componentMap = require("../componentMap");
const AntiFireAlarm = require("../components/AntiFireAlarm");
const FertilizeSystem = require("../components/FertilizeSystem");
const GardenManagementSystem = require("../components/GardenManagementSystem");
const HeatSystem = require("../components/HeatSystem");
const HumanPresenceDetector = require("../components/HumanPresenceDetector");
const InternetSwitch = require("../components/InternetSwitch");
const RainDetector = require("../components/RainDetector");
const SecurityAlarm = require("../components/SecurityAlarm");
const TemperatureSensor = require("../components/TemperatureSensor");
const WateringSystem = require("../components/WateringSystem");
const WindowsOpeningSystem = require("../components/WindowsOpeningSystem");
const LightSwitch = require("../components/LightSwitch");
const postRoute = express.Router();
const availableInsidePlaces = ["bedroom", "bathroom", "kitchen", "hall", "livingroom"];
const availableOutsidePlaces = ["grass", "garden"];

postRoute.post("/single/:type", (req, res) => {
    switch (req.params.type) {
        case "garden-management-system": 
            if (componentMap.has("garden-management-system-single")) return res.status(400).send(messages.ALREADY_EXISTS);
            else {
                const gardenManagementSystem = new GardenManagementSystem();
                componentMap.set("garden-management-system-single", gardenManagementSystem);
                return res.send(messages.CREATED);
            }
            break;
        case "anti-fire-alarm": 
            if (componentMap.has("anti-fire-alarm-single")) return res.status(400).send(messages.ALREADY_EXISTS);
            else {
                const antiFireAlarm = new AntiFireAlarm();
                componentMap.set("anti-fire-alarm-single", antiFireAlarm);
                return res.send(messages.CREATED);
            }
            break;
        case "rain-detector": 
            if (componentMap.has("rain-detector-single")) return res.status(400).send(messages.ALREADY_EXISTS);
            else {
                const rainDetector = new RainDetector();
                componentMap.set("rain-detector-single", rainDetector);
                return res.send(messages.CREATED);
            }
            break;
        case "security-alarm": 
            if (componentMap.has("security-alarm-single")) return res.status(400).send(messages.ALREADY_EXISTS);
            else {
                const securityAlarm = new SecurityAlarm();
                componentMap.set("security-alarm-single", securityAlarm);
                return res.send(messages.CREATED);
            }
            break;
        case "internet-switch":
            if (componentMap.has("internet-switch-single")) return res.status(400).send(messages.ALREADY_EXISTS);
            else {
                const internetSwitch = new InternetSwitch();
                componentMap.set("internet-switch-single", internetSwitch);
                return res.send(messages.CREATED);
            }
            break;
        default:
            return res.status(400).send(messages.BAD_REQUEST);
    }
});


postRoute.post("/multiple/outside/:place/:type", (req, res) => {
    if (availableOutsidePlaces.some(place => place === req.params.place)) {
        switch (req.params.type) {
            case "fertilize-system": 
                if (componentMap.has(`fertilize-system-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const fertilizeSystem = new FertilizeSystem(req.params.place);
                    componentMap.set(`fertilize-system-${req.params.place}`, fertilizeSystem);
                    return res.send(messages.CREATED);
                }
                break;
            case "watering-system": 
                if (componentMap.has(`watering-system-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const wateringSystem = new WateringSystem(req.params.place);
                    componentMap.set(`watering-system-${req.params.place}`, wateringSystem);
                    return res.send(messages.CREATED);
                }
                break;
            default:
                return res.status(400).send(messages.BAD_REQUEST);
        }
    } else return res.status(400).send(messages.BAD_REQUEST);
}); 

postRoute.post("/multiple/inside/:place/:type", (req, res) => {
    if (availableInsidePlaces.some(place => place === req.params.place)) {
        switch (req.params.type) {
            case "heat-system":
                if (componentMap.has(`heat-system-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const heatSystem = new HeatSystem(req.params.place);
                    componentMap.set(`heat-system-${req.params.place}`, heatSystem);
                    return res.send(messages.CREATED);
                }
                break;
            case "light-switch":
                if (componentMap.has(`light-switch-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const lightSwitch = new LightSwitch(req.params.place);
                    componentMap.set(`light-switch-${req.params.place}`, lightSwitch);
                    return res.send(messages.CREATED);
                }
                break;  
            case "temperature-sensor":
                if (componentMap.has(`temperature-sensor-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const temperatureSensor = new TemperatureSensor(req.params.place);
                    componentMap.set(`temperature-sensor-${req.params.place}`, temperatureSensor);
                    return res.send(messages.CREATED);
                }
                break;  
            case "windows-opening-system":
                if (componentMap.has(`windows-opening-system-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const windowsOpeningSystem = new WindowsOpeningSystem(req.params.place);
                    componentMap.set(`windows-opening-system-${req.params.place}`, windowsOpeningSystem);
                    return res.send(messages.CREATED);
                }
                break;  
            case "human-presence-detector":
                if (componentMap.has(`human-presence-detector-${req.params.place}`)) return res.status(400).send(messages.ALREADY_EXISTS);
                else {
                    const humanPresenceDetector = new HumanPresenceDetector(req.params.place);
                    componentMap.set(`human-presence-detector-${req.params.place}`, humanPresenceDetector);
                    return res.send(messages.CREATED);
                }
                break; 
        }
    } else return res.status(400).send(messages.BAD_REQUEST);
});

module.exports = postRoute;