const http = require("http");
const PORT = 5502;

const server = http.createServer((req, res) => {
  console.log("status: successful");

  const head = {};

  const ALLOWED_ORIGINS = ["http://127.0.0.1:5501", "http://127.0.0.1:8886"];

  const reqOrigin = req.headers.origin;

  console.log(reqOrigin);

  if (ALLOWED_ORIGINS.includes(reqOrigin)) {
    // Specify Access-Control-Allow-Origin to resolve CORS issue
    head["Access-Control-Allow-Origin"] = reqOrigin;
  }

  // Related to cache
  // head["Vary"] = "Origin";

  res.writeHead(200, head);

  res.end('{"uid":"001","username":"twx0504"}');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
