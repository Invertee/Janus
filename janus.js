// Import config
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/routes.js");
const app = express();
app.use(express.static(__dirname + '/www' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by')

routes(app);
const server = app.listen( process.env.port, function () {
    console.log("app running on port:", server.address().port);
});