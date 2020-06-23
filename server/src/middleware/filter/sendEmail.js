const nodemailer = require('nodemailer');

exports.sendEmail = (email, code) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'robot.enjeux@gmail.com',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'robot.enjeux@gmail.com',
        to: 'mou955zoo@gmail.com',
        subject: 'Confirmation de votre email Dashboard Inglorius',
        html: '<h1>Welcome ' + email + '</h1><p>Voici votre code de confirmation : <strong>' + code + '</strong></p>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}