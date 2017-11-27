const fs = require('fs')
const favicon = '/favicon.ico'

module.exports = (request, response) => {
    if(request.pathname===favicon) {
        fs.readFile('.' + favicon, (err, data) => {
            if (err) {
                console.log(err.message)
                return
            }
            response.writeHead(200, {
                'content-type': 'image/x-icon'
            })
            response.write(data)
            response.end()
        })
    }else {
        return true
    }
}