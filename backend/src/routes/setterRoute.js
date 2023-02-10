const express = require("express");
const messages = require("./messages/messages");
const componentMap = require("../componentMap");
const setterRoute = express.Router();

setterRoute.put("/high/:id/:value", (req, res) => {
    const value = parseInt(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get(req.params.id);
    if (component) {
        component.setHigh(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});
setterRoute.put("/low/:id/:value", (req, res) => {
    const value = parseInt(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get(req.params.id);
    if (component) {
        component.setLow(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});

setterRoute.put("/amplitude/:id/:value", (req, res) => {
    const value = parseFloat(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get(req.params.id);
    if (component) {
        component.setAmplitude(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});

setterRoute.put("/garden/water/low/:value", (req, res) => {
    const value = parseFloat(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get("garden-management-system-single");
    if (component) {
        component.setLowWater(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});
setterRoute.put("/garden/water/high/:value", (req, res) => {
    const value = parseFloat(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get("garden-management-system-single");
    if (component) {
        component.setHighWater(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});
setterRoute.put("/garden/fertilizers/low/:value", (req, res) => {
    const value = parseFloat(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get("garden-management-system-single");
    if (component) {
        component.setLowFertilizers(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});
setterRoute.put("/garden/fertilizers/high/:value", (req, res) => {
    const value = parseFloat(req.params.value);
    if (isNaN(value)) return res.status(400).send(messages.BAD_REQUEST);
    const component = componentMap.get("garden-management-system-single");
    if (component) {
        component.setHighFertilizers(value);
        return res.send(messages.UPDATED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});

module.exports = setterRoute;