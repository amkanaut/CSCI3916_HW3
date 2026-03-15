const express = require('express');
const router = express.Router();
const { 
    createMovie,
    getMovies,
    deleteMovie,
    getMovieById,
    updateMovie
 } = require('../controllers/movieController');

// Mapping the routes to controller functions 


// This route for only api/movies
router.route('/')
    .get(getMovies)
    .post(createMovie);

// These are for only api/movies/:id
router.route('/:id')
    .get(getMovieById)
    .put(updateMovie)
    .delete(deleteMovie);

module.exports = router; 

