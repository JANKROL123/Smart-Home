const express = require("express");
const UserModel = require("./database/UserModel");
const messages = require("./messages/messages");
const bcrypt = require("bcrypt");
const usersRoute = express.Router();
usersRoute.use(express.json());

usersRoute.get("/", async (_req, res) => {
    try {
        const usersRequest = await UserModel.find({});
        return res.send(usersRequest.map(user => {
            const {_id, login, } = user;
            return {id: _id, login};
        }));
    } catch {
        return res.status(500).send();
    }
});

usersRoute.get("/:login", async (req, res) => {
    try {
        const userExists = await UserModel.findOne({login: req.params.login});
        if (!userExists) return res.send(messages.DOES_NOT_EXIST);
        return res.send(userExists);
    } catch {
        return res.status(500).send();
    }
}); 

usersRoute.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userBody = {
            login: req.body.login,
            password: hashedPassword,
            added: new Date()
        }
        const checkUser = await UserModel.findOne({login: req.body.login});
        if (checkUser) return res.send(messages.ALREADY_EXISTS);
        const user = await UserModel.create(userBody);
        return res.send(user.login);
    } catch {
        return res.status(500).send();
    }
});

usersRoute.post("/login", async (req, res) => {
    try {
        const userRequest = await UserModel.findOne({login: req.body.login});
        if (!userRequest) return res.send(messages.DOES_NOT_EXIST);
        const passwordCompare = await bcrypt.compare(req.body.password, userRequest.password);
        return passwordCompare
        ? res.send(userRequest.login)
        : res.send(messages.INCORRECT);
    } catch {
        return res.status(500).send();
    }
});

usersRoute.delete("/:id", async (req, res) => {
    try {
        await UserModel.deleteOne({_id: req.params.id});
        return res.send(messages.DELETED);
    } catch {
        return res.status(500).send();
    }
});

module.exports = usersRoute;
