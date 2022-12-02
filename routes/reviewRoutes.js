const express = require('express');
const reviewRoutes = express.Router();
const { createReviewController, getAllReviewController, getTop3Reviews
} =
    require('../controller/reviewController');
// plans -> get all the plans from db -> sensitive route -> protected route -> logged in i will only allow that person 
reviewRoutes.get("/best3",getTop3Reviews);
reviewRoutes.route("/")
    .get(getAllReviewController)
    .post(createReviewController)
// loggedin plan
module.exports = reviewRoutes;
