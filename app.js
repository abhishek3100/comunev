var express = require("express");
var app = express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mongoose = require("mongoose");
const { Binary } = require("mongodb");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/comunev1",{useNewUrlParser: true});
var nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    education: String,
    position: String,
    file: Object,
    phone: Number,
    url: String
});
var User = mongoose.model("User", nameSchema);
app.post("/hiring", (req, res) =>{
    var myData = new User(req.body);
    myData.save().then(item =>{
        res.sendFile(__dirname + "/success.html");
    })
    .catch(err => {
        res.status(400).send("Unable to save to Mongo");
    });
});

app.get("/", (req, res) => {
    //res.send("Hello World");
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log("Server listening on port "+ port);
});