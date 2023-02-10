const express = require("express");
const messages = require("./messages/messages");
const componentMap = require("../componentMap");
const getParamsRoute = express.Router();

getParamsRoute.get("/:id", (req, res) => {
    const component = componentMap.get(req.params.id);
    if (component) {
        const componentParams = component.getParams();
        return res.send(componentParams);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});

module.exports = getParamsRoute;