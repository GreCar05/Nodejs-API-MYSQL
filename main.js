const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "API RESTFULL En Servicio"});
});

app.listen(5000, () => {
    console.log("Servidor esta corriendo on puerto 5000.");
});