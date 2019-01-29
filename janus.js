var express = require("express");

var routes = require("./routes/routes.js");
var app = express();
app.use(express.static(__dirname + '/www' ));
app.set('views', __dirname + '/www')
app.set('view engine', 'ejs');

routes(app);
var server = app.listen(23000, function () {
    console.log("app running on port:", server.address().port);
});