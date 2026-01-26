const http = require("http");
const PORT = 5503;

const server = http.createServer((req, res) => {
  const callback = req.url.split("=")[1];
  const data = JSON.stringify({ username: "admin", password: "123456" });

  res.end(`${callback}(${data})`);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
