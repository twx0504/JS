const http = require("http");
const fs = require("fs");
const axios = require("axios");

const PORT = 8882;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // This serves HTML file.
    // This imitates webpage sending requests and facing CORS issue.
    const html = fs.readFileSync("./demo/index.html");
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(html);
  } else if (req.url === "/getInfo") {
    // This mimicks a Proxy server to get info from http://localhost:8881
    // Communication between servers has no CORS issue.
    axios.get("http://127.0.0.1:8881").then(({ data }) => {
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
