const {
    createReview,
    getAllReviews,
    getProductReviews,
    updateReview,
    deleteReview
} = require('../Services/ReviewsService');

// Get all reviews
const getAllReviewsController = async (req, res) => {
    try {
        const reviews = await getAllReviews();
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Get reviews for a specific product
const getProductReviewsController = async (req, res) => {
    try {
        const { product_id } = req.params; // Extract product_id from the URL parameters
        const reviews = await getProductReviews(product_id);

        if (reviews.length) {
            res.status(200).json({ reviews });
        } else {
            res.status(404).json({ message: 'No reviews found for this product' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Create a new review
const createReviewController = async (req, res) => {
    try {
        const { user_id, product_id, rating, review_text } = req.body; // Extract data from request body
        const newReview = await createReview(user_id, product_id, rating, review_text);

        if (newReview) {
            res.status(201).json({ message: 'Review created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create review' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Update an existing review
const updateReviewController = async (req, res) => {
    try {
        const { review_id } = req.params; // Extract review_id from URL parameters
        const { rating, review_text } = req.body; // Extract updated data from request body

        const updatedReview = await updateReview(review_id, rating, review_text);

        if (updatedReview) {
            res.status(200).json({ message: 'Review updated successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Delete a review
const deleteReviewController = async (req, res) => {
    try {
        const { review_id } = req.params; // Extract review_id from URL parameters

        const deleted = await deleteReview(review_id);

        if (deleted) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    getAllReviewsController,
    createReviewController,
    updateReviewController,
    deleteReviewController,
};
