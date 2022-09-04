const nodemailer = require("nodemailer");
const APP_EMAIL = process.env.APP_EMAIL || require("../secrets").APP_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD || require("../secrets").APP_PASSWORD;
async function mailSender(email, token) {
    // input through which mechanism send your email
    //  -> port, facilitator (technical details) 
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: APP_EMAIL,
            pass: APP_PASSWORD
        }
    });
    let dataObj = {
        from: '"Cult fit clone 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔ Your reset token ", // Subject line
        html: `<b>Your rest is  token ${token}?</b>`,
    }
    // send mail with defined transporter object
    let info = await transporter.sendMail(dataObj);
}
// mailSender(email, token)
//     .then(function () {
//         console.log("mail send successfully")
//     })
// .catch (console.error);
module.exports = mailSender;