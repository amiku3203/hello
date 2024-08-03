 
const express= require("express");
const app= express();
const nodemailer= require("nodemailer")
const port= 7000;
const cors= require("cors");
const bodyParser = require("body-parser")
app.use(cors());
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'biztoindia5@gmail.com',
        pass: 'sogl iqoy ghjq xhjx'
    }
});

 
// Route to send email
app.post("/send-email", (req, res) => {
    const { to, subject, text } = req.body;
    console.log("to", to);
    const emaillist = to; // Convert array to comma-separated string

    const mailOptions = {
        from: 'biztoindia5@gmail.com',
        to: emaillist,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email: ", error);
            return res.status(500).send("Error sending email");
        }
        console.log("Email sent: ", info.response);
        res.status(200).send("Email sent successfully");
    });
});

app.listen(port,(err)=>{
  if(err){
    console.log(err)
  }
  console.log("connected")
})