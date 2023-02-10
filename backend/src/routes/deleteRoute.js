const express = require("express");
const messages = require("./messages/messages");
const componentMap = require("../componentMap");
const deleteRoute = express.Router();

deleteRoute.delete("/:id", (req, res) => {
    const component = componentMap.get(req.params.id);
    if (component) {
        component.onExit();
        componentMap.delete(req.params.id);
        return res.send(messages.DELETED);
    } else return res.status(404).send(messages.DOES_NOT_EXIST);
});

module.exports = deleteRoute;