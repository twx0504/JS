// http is a built-in modules in Nodejs, used to create HTTP server.
const http = require("http");
const PORT = 8886;

// Create a server
// - request: receive data from request
// - response: deal with response data
const server = http.createServer((request, response) => {
  // Additional request sent from:
  // - favicon (/favicon.ico)
  // - dev tool (/.well-known/appspecific/com.chrome.devtools.json)

  const cookie = request.headers.cookie;
  
  console.info(cookie);

  // Set response header
  response.writeHead(200, {
    // Content-Type tells the client what type of content is being sent
    // - text/plain: specify MIME type (the type of response data) as plain text so the client know how to interpret the content
    // - charset=utf-8： specify the character encoding as utf-8 to display the characters correctly
    //  - Prevent gibberish text from display in client
    "Content-Type": "text/plain;charset=utf-8",

    // Set-Cookie
    "Set-Cookie": "username=twx0504",
  });

  if (cookie) {
    response.write("Thanks, I have received your cookie.");
  } else {
    response.write("Sorry, I didn't receive your cookie.");
  }

  // Send response data to client
  // Multiple write calls will be concatenated into one string
  response.write("Hello");
  response.write("World");

  // Stop response to prevent client from waiting
  // response.end can still carry the last bits of data
  response.end("结束");
});

server.listen(PORT);

console.log(`server is listened on http://127.0.0.1:${PORT}`);
