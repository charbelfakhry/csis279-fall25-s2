const express = require('express');
const { createReview, getReviewById, updateReview, deleteReview, getAllReviews } = require('../controllers/reviewController');
const { reviewValidationRules, validate } = require('../Validators/reviewValidator');
const router = express.Router();

router.post('/reviews', reviewValidationRules, validate, createReview);
router.get('/reviews', getAllReviews);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', reviewValidationRules, validate, updateReview);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
