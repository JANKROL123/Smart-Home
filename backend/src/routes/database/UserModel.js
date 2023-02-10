const { model, Schema} = require("mongoose");
const userSchema = new Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    added: {type: Date, required: true}
});
const UserModel = model("User", userSchema, "users");
module.exports = UserModel;