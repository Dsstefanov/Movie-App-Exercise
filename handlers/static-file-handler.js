const fs = require('fs')
module.exports = (request, response) => {
    if (request.pathname.startsWith('/public') ||
        request.pathname.startsWith('/bower_components') ||
        request.pathname.startsWith('/dist') ||
        request.pathname.startsWith('public') ||
        request.pathname.startsWith('bower_components') ||
        request.pathname.startsWith('dist')) {
        fs.readFile('.' + request.pathname, (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            if (request.pathname.endsWith('.css')) {
                response.writeHead(200, {
                    'content-type': 'text/css'
                })
                response.write(data)
                response.end()
            } else if (request.pathname.endsWith('.js')) {
                response.writeHead(200, {
                    'content-type': 'application/javascript'
                })
                response.write(data)
                response.end()
            } else if (request.pathname.endsWith('.html')) {
                response.writeHead(200, {
                    'content-type': 'text/html'
                })
                response.write(data)
                response.end()
            } else if (request.pathname.endsWith('.jpg')) {
                response.writeHead(200, {
                    'content-type': 'image/jpeg'
                })
                response.write(data)
                response.end()
            } else if (request.pathname.endsWith('.png')) {
                response.writeHead(200, {
                    'content-type': 'image/png'
                })
                response.write(data)
                response.end()
            } else {
                fs.readFile('./dist/html/home.html', (err, data) => {
                    if(err){
                        console.log(err.message)
                        return
                    }
                    response.writeHead(404, {
                        'content-type': 'text/html'
                    })
                    data = data.toString().replace(`<h1>Hello I'm your Node Movie DB app!</h1>`, `<h1 id="errMsg2">Unfortunately resource was not found!</h1>`)
                    response.write(data)
                    response.end()
                })
            }
        })
    } else {
        fs.readFile('./dist/html/home.html', (err, data) => {
            if(err){
                console.log(err.message)
                return
            }
            data =data.toString().replace(`<h1>Hello I'm your Node Movie DB app!</h1>`, `<h1 id="errMsg2">Unfortunately resource was not found!</h1>`)
            response.write(data)
            response.end()
        })
    }
}