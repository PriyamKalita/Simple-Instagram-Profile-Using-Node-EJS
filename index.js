const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

// Serving Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if (data) {
        res.render("instagram", { data });
    } else {
        res.render("error");
    }
});

app.get("/rolldice", (req, res) => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice", { diceValue });
});

app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
});
