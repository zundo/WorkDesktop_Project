const express = require('express'),
    index = require('../middleware/filter/index'),
    nodemailer = require('nodemailer');

exports.sendMailSupport = async(req, res) => {
    const data = req.body;

    if (index.exist(data.nom) == false || index.exist(data.prenom) == false || index.exist(data.email) == false || index.exist(data.numero_tel) == false || index.exist(data.objet) == false || index.exist(data.message) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        });
    } else {
        if (index.textFormat(data.nom) == false || index.textFormat(data.prenom) == false || index.emailFormat(data.email) == false || index.textFormat(data.objet) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            });
        } else {
            /*async function main() {
                let testAccount = await nodemailer.createTestAccount();
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                });
                let info = await transporter.sendMail({
                    from: '"Support 👻" <robot.enjeux@gmail.com>',
                    to: "robot.enjeux@gmail.com",
                    subject: "Message pour l'équipe Inglorius: " + data.objet,
                    html: "<h1><strong>Message de" + data.prenom + " " + data.nom + "</strong></h1><br />" + data.email + " " + data.numero_tel + "<br />" + data.message
                });
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);*/

            /*var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'robot.enjeux@gmail.com',
                    pass: 'robotenjeux123' //mdp a ajoute !
                }
            });

            var mailOptions = {
                from: 'robot.enjeux@gmail.com',
                to: 'robot.enjeux@gmail.com',
                subject: "Message pour l'équipe Inglorius: " + data.objet,
                html: "<h1><strong>Message de" + data.prenom + " " + data.nom + "</strong></h1><br />" + data.email + " " + data.numero_tel + "<br />" + data.message
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });*/
        }
    }
}