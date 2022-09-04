
// router
const FoodBookingModel = require("../model/bookingModel");
const UserModel = require("../model/userModel");
const Razorpay = require("razorpay");
let { KEY_ID, KEY_SECRET } = require("../secrets");
var razorpay = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
});
// createbooking
async function initiateBooking(req, res) {
    try {
        let booking = await FoodBookingModel.create(req.body);
        let bookingId = booking["_id"];
        let userId = req.body.user;
        let user = await UserModel.findById(userId);
        user.bookings.push(bookingId);
        await user.save();
        const payment_capture = 1;
        const amount = 500;
        const currency = "INR";
        const options = {
            amount,
            currency,
            receipt: `rs_${bookingId}`,
            payment_capture,
        };
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            booking: booking,
            message: "booking created",
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
async function verifyPayment(req, res) {
    // JWT 
    const secret = KEY_SECRET
    // console.log(req.body);
    // 
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    console.log(digest, req.headers["x-razorpay-signature"]);
    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit");
        res.status(200).json({
            message: "OK",
        });
    } else {
        res.status(403).json({ message: "Invalid" });
    }
};
async function getBooking(req, res) {
    try {
        let id = req.params.planRoutes;
        let booking = await FoodBookingModel.findById(id);
        res.status(200).json({
            result: "booking found",
            booking: booking

        });

    } catch (err) {
        console.log(err);
        res.json(500).json({
            err: err.message
        })
    }
}
async function getBookings(req, res) {
    try {
        let bookings = await FoodBookingModel.find();
        // to send json data ;
        res.json(bookings);
    } catch (err) {
        res.end(err.message);
    }
}
module.exports = {
    initiateBooking,
    verifyPayment,
    getBooking, getBookings
}