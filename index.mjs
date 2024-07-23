import express from "express";
import http from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";


const app = express();
const port = 8080;
const __dirname = process.cwd();
const server = http.createServer();
const bareServer = createBareServer("/server/");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/files');

app.get('/', (req, res) => {
    res.render("index");
});

app.use((req, res) => {
    res.statusCode = 404;
    res.render("404");
});

server.on("request", (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.on("listening", () => {
    console.log(`Running on http://localhost:${port}`);
});

server.listen({
    port: port,
});