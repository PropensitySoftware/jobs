var CONFIG = require(__dirname + "/config/env/" + (process.env.NODE_ENV || 'dev') + '.js');
var express = require("express");
var app = express();
var cors = require("cors");

var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(bodyParser());

var mongoose = require("mongoose");
mongoose.connect(CONFIG.db);

var Resource = mongoose.model("Resource", {name: String});

app.get("/svc", function(req, res) {

    Resource.find(function(err, resources) {
        res.send(resources);
    });

});

app.post("/svc/add", function(req, res) {

    var name = req.body.name;
    var resource = new Resource({name:name});
    resource.save(function(err) {
        res.send();
    });


});

app.listen(CONFIG.port);