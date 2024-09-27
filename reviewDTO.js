const ReviewDTO = (review) => ({
    id: review.id,
    userId: review.userId,
    productId: review.productId,
    rating: review.rating,
    comment: review.comment
});

module.exports = ReviewDTO;
