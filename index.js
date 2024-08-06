const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const port = 7000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'biztoindia5@gmail.com',
        pass: 'sogl iqoy ghjq xhjx'
    }
});

const sendMailAsync = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
    console.log("to", to);
    const emaillist = to.join(','); // Convert array to comma-separated string if it's an array

    const mailOptions = {
        from: 'biztoindia5@gmail.com',
        to:  "bamboochickmakerandpigeonnet@gmail.com",
        subject: subject,
        text: text,
    };

    try {
        const info = await sendMailAsync(mailOptions);
        console.log("Email sent: ", info.response);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.log("Error sending email: ", error);
        res.status(500).send("Error sending email");
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("connected");
});
