const express = require('express');
const { getAllReviewsController,
    createReviewController,
    updateReviewController,
    deleteReviewController } = require('../Controllers/reviewsController');
const { reviewValidationRules, validate } = require('../Validators/reviewValidator');
const router = express.Router();

router.post('/CreateReviews', reviewValidationRules, validate, createReviewController);
router.get('/GetAllReviews', getAllReviewsController);
router.put('/UpdateReviews/:id', reviewValidationRules, validate, updateReviewController);
router.delete('/DeleteReviews/:id', deleteReviewController);

module.exports = router;
