const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body; 

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kunalkashid2002@gmail.com",
            pass: "**********"
        }
    });

    let mailOptions = {
        from: '"Your Name" <your-email@gmail.com>',
        to: email,
        subject: "Message from Contact Form",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send("Failed to send email.");
        } else {
            console.log("Email sent:", info.response);
            res.status(200).send("Email sent successfully.");
        }
    });
});

app.options("/send-email", (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));