const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("screamIT", (text) => {
    return text.toUpperCase();
});


app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log;
    log = `${now} ${req.method} ${req.url}\n`;

    fs.appendFile('server.log', log, (error) => {
        if(error) {
            console.log("unable to appened server.log");
        }
        
    });

    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    
    res.render("home.hbs", {
        pageTitle: 'home',
        currentYear: new Date().getFullYear(),
        welcomeMessage: "welcome to my website" 
    });

});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: 'About'        
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage:"there is a error"
    });
});

app.listen(3000);