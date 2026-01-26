const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  req.on("data", (chunk) => {
    console.log(JSON.parse(chunk.toString()));
  });

  const reqOrigin = req.headers.origin;
  const ALLOWED_ORIGIN = ["http://127.0.0.1:5501"];

  if (ALLOWED_ORIGIN.includes(reqOrigin)) {
    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", reqOrigin);
    // Allow Cookies
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Allow Headers
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    // Dealing with preflight OPTIONS request
    res.writeHead(204);
    res.end();
    return;
  }

  // Set cookies
  // - Cookies will be sent with the subsequent client requests
  // - For Chrome v80+, SameSite defaults to Lax, this causes some problems with cookie transfer.
  // - Set SameSite=None & Secure to make sure the cookie transfer works properly
  // - This requires backend to help.
  // - Alternative: use Firefox to test
  res.setHeader("Set-Cookie", "username=twx0504; SameSite=None; Secure");

  if (req.method === "POST" && req.url === "/image") {
    const img = fs.readFileSync("./img.jpg");
    const stat = fs.statSync("./img.jpg");
    // Set response header
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      // To make lengthComputable to be true, the server must remember to set Content-Length header
      "Content-Length": stat.size,
    });

    return res.end(img);
  }

  if (req.method === "GET" && req.url === "/api/users/1") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify({ id: "001", username: "twx0504", age: 26 })); // JSON
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify({ connection: "successful" })); // JSON
    //   res.end(undefined);
    //   res.end(null);
  }

  if (req.method === "GET" && req.url.includes("/search")) {
    const keyword = url.parse(req.url, true).query.keyword;

    // Generate a set of alphabet a - z
    const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i),
    );

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    // Generate the number of data to be returned
    const dataCount = randomize(3, 5);

    // Construct mocked data
    const data = new Array(dataCount).fill(0).map(() => {
      // Generate the number of loop count randomly
      let loopCount = randomize(5, 15);

      // Store generated words, starting with keyword
      let str = keyword;

      while (loopCount > 0) {
        // Retrieve letter
        const alphabetIndex = randomize(0, 25);
        // Append letter to str
        str += alphabet[alphabetIndex];
        loopCount--;
      }

      return {
        keyword: str,
      };
    });

    return res.end(
      JSON.stringify({
        status: "success",
        data,
      }),
    );
  }
});

server.listen(8881, () => {
  console.log("Server is running on http://127.0.0.1:8881");
});

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
