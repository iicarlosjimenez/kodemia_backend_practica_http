const http = require("http");

const host = 'localhost';
const port = 6666;

const requestListener = function (req, res) {
   res.setHeader("Content-Type", "text/csv");
   res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv");
   res.writeHead(200);
   const contentCsv = `id,name,email\n1,Sammy Shark,shark@ocean.com\n`
   res.end(contentCsv);
 };

const server = http.createServer(requestListener);
server.listen(port, host, () => {
   console.log(`Server is running on http://${host}:${port}`);
});