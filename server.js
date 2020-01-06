var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
var customers = [];
var waitlist = [];
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, 'view.html'));
});
app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, 'reservation.html'))
});
app.get('/api/tables', function (req, res) {
    return res.json(customers);
});
app.get('/api/waitlist', function (req, res) {
    return res.json(waitlist);
});
app.post('/api/clear', function (req, res) {
    customers = [];
    waitlist = [];
});
app.post('/api/new', function (req, res) {
    console.log('Works');
    var newCustomer = req.body;
    let blank;
    if (customers.length >= 5) {
        waitlist.push(newCustomer);
        blank = true;
    } else {
        customers.push(newCustomer);
        blank = false;
    }
    res.json(blank);
});
app.listen(port, function () {
    console.log("App listening on PORT " + port);
});