import { ChemicalServer } from "chemicaljs";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const chemical = new ChemicalServer({
    default: "uv",
    uv: true,
    scramjet: false,
    rammerhead: false
});

chemical.app.use(express.static(path.join(__dirname, "public")));
chemical.app.set("views", path.join(__dirname, "files"));
chemical.app.set("view engine", "ejs");

chemical.app.get("/", (req, res) => {
    res.render("index");
});

chemical.listen(port, () => {
    console.log(`Chemical demo running on http://localhost:${port}`);
});
