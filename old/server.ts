import http from 'http'
import fs from 'fs'
import mime from 'mime-types'


const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
let lookup = mime.lookup

const server = http.createServer((req, res) => {
    let path = req.url as string

    if (path == "/" || path == "/home"){
        path = "/index.html"
    }

    let mimeType  = lookup(path.substring(1)) as string

    fs.readFile(__dirname + path, (err, data) =>{
        if(err){
            res.writeHead(404)
            res.end("ERROR 404")
            return
        }
        res.setHeader("X-Content-Type-Options", "nosniff")
        res.writeHead(200, {
            "Content-Type": mimeType
        })
        res.end(data)
    });
    

});


server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});