const http = require('http')
const host = 'localhost'
const port = 6666

const requestListener = function (req, res)  {
   res.writeHead(200)
   res.end("My fisrt server!\n")
}

const server = http.createServer(requestListener)
server.listen(port,host, () => {
   console.log(`Server is running on http://${host}:${port}`);
})
