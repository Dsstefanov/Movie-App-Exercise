const fs = require('fs')
const db = require('./../config/data')
const filePath = './dist/html/details.html'

module.exports = (request, response) => {
    let movieId = request.pathname.split("/").pop();
    if (request.pathname === '/movies/details/' +movieId) {
        if(db[movieId]) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err.message)
                    return
                }
                response.writeHead(200, {
                    'content-type': 'text/html'
                })
                data = data.toString().replace(`<div id="replaceMe">{{replaceMe}}</div>`,
                    `<div class="content">
<img src="${decodeURIComponent(db[movieId].moviePoster)}" alt=""/>
<h3>Title ${decodeURIComponent(db[movieId].movieTitle).split('+').join(' ')}</h3>
<h3>Year ${decodeURIComponent(db[movieId].movieYear).split('+').join(' ')}</h3>
<p> ${decodeURIComponent(db[movieId].movieDescription).split("+").join(" ")}</p>
</div>​`)
                response.write(data)
                response.end()
            })
        }else{
            fs.readFile('./dist/html/home.html', (err, data) => {
                if(err){
                    console.log(err.message)
                    return
                }
                response.writeHead(404, {
                    'content-type': 'text/html'
                })
                data =data.toString().replace(`<h1>Hello I'm your Node Movie DB app!</h1>`, `<h1 id="errMsg2">Unfortunately resource was not found!</h1>`)
                response.write(data)
            })
        }
    } else {
        return true
    }
}