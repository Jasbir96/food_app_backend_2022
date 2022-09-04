const express = require("express");
const {verifyPayment,initiateBooking} = require("../controller/bookingController")
// deletebooking
const bookingRouter = express.Router();
bookingRouter.route("/verification").post(verifyPayment)
bookingRouter
    .route("/:id")
    .get(getbooking)
// ****************************************************
bookingRouter
    .route("/")
    .get(getbookings)
    // create -> payment done 
    .post(initiateBooking);
module.exports = bookingRouter;
