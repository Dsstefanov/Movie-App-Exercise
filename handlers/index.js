'use strict'

const faviconHandler = require('./favicon-handler-min')
const homeHandler = require('./home-handler-min')
const staticFileHandler = require('./static-file-handler-min')
const moviesHandler= require('./view-all-movies-handler-min')
const addMovieHandler = require('./add-movie-handler-min')
const movieDetailsHandler = require('./movie-details-handler-min')

module.exports = [faviconHandler, homeHandler, movieDetailsHandler, addMovieHandler,moviesHandler,staticFileHandler]