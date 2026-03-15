const Movie = require('..models/Movie'); 

// @desc Takes request, interacts with Model, and sends a response
// @route POST /api/movies



// [x]@desc get all movies
// @route GET /api/movies

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });

    }
};


// [x] @desc create a movie(Same as saving, but it first creates it and then saves it)
// @route POST /api/movies
const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ 
            message: 'Failed to create movie due to invalid data', 
            details: error.message 
        });
    }
};


 // [x] @desc Return a specific movie based on the :movieparameter(movie.id)
 // route GET api/movies/:id

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' }); // If it is not associated with a movie, display error
        }

        res.status(200).json(movie);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ messsage: 'Invalid movie ID format' });

        }
        res.status(500).json({ message: 'Server error', details: error.message});
    }
};

// [] @desc update a movie
// @route PUT /api/movies/:id

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            res.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found '});
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed' , details: error.message });
        }
        res.status(500).json({ message: 'Server Error' , details: error.message });
    }
};


// [] @desc delete a movie
// @route DELETE /api/movies/:id

const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie successfully deleted', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
};

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById
};