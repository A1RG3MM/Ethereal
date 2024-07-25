import express from "express";
import http from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";


const app = express();
const port = 8080;
const __dirname = process.cwd();
const server = http.createServer();
const bareServer = createBareServer("/bare/");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/files');

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/gms', (req, res) => {
    res.render("games");
});
app.get('/fr', (req, res) => {
    // frame.ejs code
    const { url, type } = req.query;
    if(!req.query) {
        res.send("invalid request. url and type query values are REQUIRED")
    } else {
        res.render("frame");
    }
});

app.get('/ai', (req, res) => {
    res.render("ai");
});

app.get('/textbook', (req, res) => {
    res.render("proxy");
});

// River ai stuff

function createSystemPrompt() {
    let systemPrompt = `You are Ethereum, an AI assistant on Ethereal. Your primary function is to provide information and complete tasks as instructed. Aim for comprehensive, informative, and objective responses. Prioritize clarity and avoid unnecessary complexity. Understand and respond to the user's intent, adapting your response accordingly. Use examples or analogies to illustrate complex points. If uncertain about a query, ask clarifying questions or suggest potential approaches. Strive to be helpful, informative, and engaging. Remember, your goal is to assist the user effectively.`;
    return systemPrompt;
}

app.get('/api/predictions', async (req, res) => {
    const userInput = req.query.userInput || '';
    let chatHistory = req.query.chatHistory ? decodeURIComponent(req.query.chatHistory).split('<br>') : [];
    chatHistory.push(`USER: ${userInput}\n`);

    const systemPrompt = createSystemPrompt();

    const historyMessages = chatHistory.map(line => {
        const role = line.startsWith('USER:') ? 'user' : 'assistant';
        const content = line.replace(/^(USER:|ASSISTANT:)\s*/, '');
        return { role, content };
    });

    const payload = {
        messages: [
            { role: "system", content: systemPrompt },
            ...historyMessages,
            { role: "user", content: userInput }
        ],
        max_tokens: 800,
        model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
        stream: "True"
    };

    const options = {
        url: 'https://api.deepinfra.com/v1/openai/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Origin': 'https://deepinfra.com',
            'Referer': 'https://deepinfra.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
        },
        body: JSON.stringify(payload)
    };

    request.post(options).pipe(res);
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
