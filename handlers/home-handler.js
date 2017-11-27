const fs = require('fs')
module.exports = (request, response) => {
    if (request.pathname === '/') {
        fs.readFile('./dist/html/home.html', (error, data) => {
            if (error) {
                console.log(error.message)
                return
            }
            response.writeHead(200, {
                'content-type': 'text/html'
            })
            response.write(data)
            response.end()
        })
    }else{
        return true
    }
}