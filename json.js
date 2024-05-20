const http = require("http");

const host = 'localhost';
const port = 8080;

const requestListener = function (req, res) {
   res.setHeader("Content-Type", "application/json");
   res.writeHead(200);
   const json = { 
      "message": "This is a JSON response" 
   }
   res.end(JSON.stringify(json));
 };

const server = http.createServer(requestListener);
server.listen(port, host, () => {
   console.log(`Server is running on http://${host}:${port}`);
});