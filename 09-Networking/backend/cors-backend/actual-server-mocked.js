const http = require("http");
const PORT = 8881;

const server = http.createServer((req, res) => {
  res.end(`Hello, I am from 8881`);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
