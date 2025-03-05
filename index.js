const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = parseInt(process.env.PORT) || 8080;
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');


app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
    console.log(`EtherealOS is listening on port ${port}!`);
    console.log(`    1. http://localhost:${port}
    2. http://127.0.0.1:${port}`);
})