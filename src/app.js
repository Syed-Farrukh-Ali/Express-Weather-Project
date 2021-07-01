const express = require('express');
const path = require('path');
// partials ko bhe hum ny alag folder me add kr deya hy usko hasil krny k leya humain hbs ko require krna pray ga
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;

// public static path for static website
// console.log(path.join(__dirname, '../public'));
const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.static(static_path));

// hum dynamic website dekhnay k leya handle bars k view engin ko use kr rahy hain
app.set('view engine', 'hbs');
// hum ny views engin walay folder k name ko change kr k uska name templates kr deya hy and us me further 2 folders bana deya hain aik views for pages aur 2nd partials for repeated code, ab humain express ko is tamplates waly folder ka static path btana ho ga agr views ka name views he rehta to express khud ba khud uska path detect kr leta.
// in simple words by default jo humara views folder tha us ko templates name k folder me rakh deya hy,so ab humain is ka static path btana ho ga
app.set('views', template_path);
// hbs ko require krny k bad humain partials ko register krna ho ga
hbs.registerPartials(partials_path);

// routing
app.get("", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("*", (req, res) => {
    res.render("404ErrorPage", {
        errorMsg: 'Opps! Page Not Found'
    });
});

app.listen(port, () => {
    console.log(`Listening to port no: ${port}`);
});