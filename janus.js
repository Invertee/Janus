const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');

const routes = require("./routes/routes.js");
const app = express();
app.use(express.static(__dirname + '/www' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
const server = app.listen( config.port, function () {
    console.log("app running on port:", server.address().port);
});