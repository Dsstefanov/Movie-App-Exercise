'use strict'
const fs = require('fs')
const qs = require('querystring')
let db = require('./../config/data')

module.exports = (request, response) => {
    if(request.pathname === '/addMovie'){
        if(request.method === 'GET' || request.method === 'get'){
            fs.readFile('./dist/html/addMovie.html', (err, data) => {
                if(err){
                    console.log(err.message)
                    return
                }
                response.writeHead(200, {
                    'content-type': 'text/html'
                })
                response.write(data)
                response.end()
            })
        }else if(request.method === 'POST' || request.method === 'post'){
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let postData = qs.parse(body)
                let validMovieFlag = true
                for (let prop in postData){
                    if(postData[prop]===''){
                        validMovieFlag = false
                    }
                }
                if(validMovieFlag){
                    fs.readFile('./dist/html/addMovie.html', (err, data)=> {
                        if(err){
                            console.log(err)
                            return
                        }
                        data = data.toString().replace(`<div id="replaceMe">{{replaceMe}}</div>`,
                            `<div id="successBox"><h2 id="successMsg">Movie Added</h2></div>`)
                        db.push(postData)
                        response.writeHead(200, {
                            'content-type': 'text/html'
                        })
                        response.write(data)
                        response.end()
                    })
                }else{
                    fs.readFile('./dist/html/addMovie.html', (err, data)=> {
                        if(err){
                            console.log(err)
                            return
                        }
                        data = data.toString().replace(`<div id="replaceMe">{{replaceMe}}</div>`,
                            `<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>`)
                        response.write(data)
                        response.end()
                    })
                }
            });
            request.on('error', (err) => {
                console.error(err.stack);
            });
        }else{
            response.statusCode= 404
            response.end()
        }
    }else{
        return true
    }
}