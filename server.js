const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const nodemailer = require('nodemailer');
const app = express();
// key and cert generated with certbot
const privateKey = fs.readFileSync('/etc/letsencrypt/live/iriesphere.eu/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/iriesphere.eu/cert.pem', 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/iriesphere.eu/fullchain.pem', 'utf8');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Middleware for parsing JSON

const credentials = { key: privateKey, cert: certificate };

app.post('/send-email', function (req, res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
	auth: {
            user: 'name@gmail.com',             // Your email that will send the inquiry
            pass: 'mmmm pppp qqqq mmmm'         // Password for your email - for gmail the user must have 2-factor authentication to generate that password
        }
    });

    let mailOptions = {
        from: req.body.email,             // Sender's email, taken from the form input
        to: 'customersupport@iriesphere.eu', // Your customer support email
        subject: 'New Customer Inquiry',
        text: `From: ${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(80, function () {
    console.log('Http server listening on port 80');
});
httpsServer.listen(443, function () {
    console.log('Https server running on port 443')
});

