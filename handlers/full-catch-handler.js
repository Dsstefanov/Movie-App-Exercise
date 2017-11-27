'use strict'
let fs = require('fs')
module.exports = (request, response) => {
    if(response.hasHeader('Full')){
        fs.readFile('./dist/html/status.html', (err, data)=> {
            if(err){
                console.log(err)
                return
            }
            response.writeHead(200, {
                'content-type': 'text/html'
            })
            response.write(data)
            response.end()
        })
    }
}