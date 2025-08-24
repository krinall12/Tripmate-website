const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional if you want backend to serve website)
app.use(express.static("public")); 

// Contact form endpoint
app.post("/contact", (req, res) => {
    const { name, email, phone, message } = req.body;

    // Save to file
    const data = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\n`;
    fs.appendFile("submissions.txt", data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Failed to save submission." });
        }
    });
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'thetripmate09@gmail.com',
        subject: 'New Contact Form Submission',
        text: data
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    

    res.json({ success: true, message: "Thank you! Your message has been received." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
