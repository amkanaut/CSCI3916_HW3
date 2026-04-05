const { MongoGridFSChunkError } = require('mongodb');
const Review = require('../models/Reviews');

// @desc Created new controller for Review methods
// @route POST api/reviews

// [] save a review POST
// @route POST /api/reviews

const postReviews = async (req, res) => {
    try {
        const newReview = new Review({
            movieId: req.body.movieId,
            username: req.user.username,
            review: req.body.review,
            rating: req.body.rating
    });
        const savedReview = await newReview.save();
        res.status(201).json({ message: 'Review created!' });
    } catch (error) {
        res.status(400).json({ 
            message: 'Failed to create review due to invalid data', 
            details: error.message 
        });
    }
};

module.exports = {
    postReviews
};

