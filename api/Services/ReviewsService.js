// CRUD services for the reviews table

const db = require('./database');

// Create a new review and inject it into the database
// Here, we assume that review_id generation is automated
const createReview = async (user_id, product_id, rating, review_text) => {
    const created_at = new Date();
    try {
        const result = await db.query
            (
                'INSERT INTO reviews (user_id, product_id, rating, review_text, created_at) VALUES ($1, $2, $3, $4, $5)',
                [user_id, product_id, rating, review_text, created_at]
            );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error creating review:', error);
        throw new Error('Error creating review');
    }
};

// Read all reviews
const getAllReviews = async () => {
    try {
        const result = await db.query('SELECT * FROM reviews');
        return result.rows;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw new Error('Error fetching reviews');
    }
};

// Read reviews for a specific product
const getProductReviews = async (productId) => {
    try {
        const result = await db.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching reviews for product:', productId, error);
        throw new Error('Error fetching reviews');
    }
};

// Update a review
const updateReview = async (reviewId, rating, review_text) => {
    try {
        const result = await db.query
            (
                'UPDATE reviews SET rating = $1, review_text = $2 WHERE review_id = $3',
                [rating, review_text, reviewId]
            );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating review:', reviewId, error);
        throw new Error('Error updating review');
    }
};

// Delete a review
const deleteReview = async (reviewId) => {
    try {
        const result = await db.query('DELETE FROM reviews WHERE review_id = $1', [reviewId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting review:', reviewId, error);
        throw new Error('Error deleting review');
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getProductReviews,
    updateReview,
    deleteReview
};