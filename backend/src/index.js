const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const componentMap = require("./componentMap");
const postRoute = require("./routes/postRoute");
const switchRoute = require("./routes/switchRoute");
const getParamsRoute = require("./routes/getParamsRoute");
const setterRoute = require("./routes/setterRoute");
const deleteRoute = require("./routes/deleteRoute");
const usersRoute = require("./routes/usersRoute");
mongoose.set('strictQuery', true);
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (_req, res) => res.send(Array.from(componentMap).map(n => n[0])));
app.use("/users", usersRoute);
app.use("/add", postRoute);
app.use("/switch", switchRoute);
app.use("/read", getParamsRoute);
app.use("/set", setterRoute);
app.use("/delete", deleteRoute);



const httpsOptions = {
    key: fs.readFileSync("key_file_without_password.key", "utf8"),
    cert: fs.readFileSync("certificate_file.crt", "utf8")
};
const httpsServer = https.createServer(httpsOptions, app);
const port = 5000;

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/protocols");
        httpsServer.listen(port, () => console.log(`HTTPS Server started on port ${port}`));
    } catch (err) {
        console.error(err);
    }
})();