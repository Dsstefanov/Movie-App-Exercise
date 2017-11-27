const fs = require('fs')

let db = require('./../config/data')
const filePath = './dist/html/viewAll.html'
module.exports = (request, response) => {
    if (request.pathname === '/viewAllMovies') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err.message)
                return
            }
            let htmlReplacement = ''
            for (let movie in db) {
                htmlReplacement += `<a href="/movies/details/${movie}"><div class="movie">
<img id="${movie}" class="moviePoster" src="${decodeURIComponent(db[movie].moviePoster)}"/>
</div></a>`
            }
            data = data.toString().replace(`<div id="replaceMe">{{replaceMe}}</div>`,
                htmlReplacement)
            response.writeHead(200, {
                'content-type': 'text/html'
            })
            response.write(data)
            response.end()
        })
    } else {
        return true
    }
}