var http = require('http');
const port = 8080;
  
http.createServer(function(req, res) {
    res.end("Ola!! Tudo funcionou corretamente");
}).listen(port);
 

console.log("Conectado ao servidor na porta " + port);
