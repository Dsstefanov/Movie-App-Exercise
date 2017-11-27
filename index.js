'use strict'
const http = require('http')
const url = require('url')
const handlers = require('./handlers-minified/index-min')
const port = 3000

http.createServer((request, response) => {
    request.pathname = url.parse(request.url).pathname
    for (let i =0; i< handlers.length; i++){
        let handler = handlers[i]
        let result = handler(request, response)
        if(!result){
            break
        }
    }
}).listen(port)
console.log(`Server listening on port ${port}`)