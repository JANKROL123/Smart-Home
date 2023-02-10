const express = require("express");
const messages = require("./messages/messages");
const componentMap = require("../componentMap");
const switchRoute = express.Router();

switchRoute.put("/on/:id", (req, res) => {
    const component = componentMap.get(req.params.id);
    if (component) {
        component.onInit();
        return res.send(messages.STARTED);
    } else return res.send(messages.DOES_NOT_EXIST);
});

switchRoute.put("/off/:id", (req, res) => {
    const component = componentMap.get(req.params.id);
    if (component) {
        component.onExit();
        return res.send(messages.STOPPED);
    } else return res.send(messages.DOES_NOT_EXIST);
});

module.exports = switchRoute;