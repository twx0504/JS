const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Response based on received req.url
  if (req.url === "/") {
    const cookie = req.headers.cookie;
    const lang = cookie ? cookie.split("=")[1] : "cn";

    let html = "";

    // Read file
    if (lang === "cn") {
      html = fs.readFileSync("./cn.html");
    } else if (lang === "en") {
      html = fs.readFileSync("./en.html");
    }

    // Set response header
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8",
    });

    res.end(html);
  } else if (req.url === "/Cookie") {
    // Load modules
    const js = fs.readFileSync("../cookie.js");
    
    res.writeHead(200, {
      "Content-Type": "application/javascript;charset=utf-8",
    });
    
    res.end(js);
  }
});

server.listen(8885, () => {
  console.log("Server is running at http://127.0.0.1:8885");
});
