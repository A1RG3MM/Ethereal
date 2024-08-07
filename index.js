import express from "express";
import http from "node:http";
import path from "node:path";
import wisp from "wisp-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { hostname } from "node:os";
//you dont need to import ejs

const app = express();
const __dirname = process.cwd();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "files"));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

app.use("/uv.bundle.js", express.static(path.join(uvPath, "uv.bundle.js")));
app.use("/uv.client.js", express.static(path.join(uvPath, "uv.client.js")));
app.use("/uv.handler.js", express.static(path.join(uvPath, "uv.handler.js")));
app.use("/uv.config.js", express.static(path.join(uvPath, "uv.config.js")));
app.use("/uv.sw.js", express.static(path.join(uvPath, "uv.sw.js")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/textbook", (req, res) => {
  res.render("proxy");
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

const server = http.createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "same-origin");
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
  else socket.end();
});

let port = parseInt(process.env.PORT || "");
if (isNaN(port)) port = 3000;

server.on("listening", () => {
  const address = server.address();
  console.log(`Succesfully connected to port ${port}!`);
  console.log("Ethereal is Listening on:")
  console.log(`\t1. http://localhost:${address.port}`);
  console.log(`\t2. http://${hostname()}:${address.port}`);
  console.log(
    `\t3. http://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

function shutdown(reason) {
  if (!reason) reason = "Unknown reason";
  console.warn("Closing HTTP server: " + reason);
  server.close();
  process.exit(0);
}

server.listen({ port });
