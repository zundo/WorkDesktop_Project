const express = require('express'),
    index = require('../index'),
    bdd = require('./modele/index'),
    bcrypt = require('bcrypt')

exports.login = (req, res) => {
    const data = req.body;
    console.log(JSON.stringify(data))
    if (index.exist(data.email) == false || index.exist(data.password) == false) {
        index.sendReturn(res, 403, { error: true, message: "L'email/password est manquant" })
    }
    if (index.emailFormat(data.email) == false) {
        index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    } else {
        bdd.query(" SELECT * FROM users WHERE email = '" + data.email + "'", (error, results) => {
            if (error != null) {
                index.sendReturn(res, 401, { error: true, message: "Requête impossible" })
            } else if (results.length == 0) {
                index.sendReturn(res, 401, { error: true, message: "Votre Email/Password est erroné" });
            } else {
                bcrypt.compare(data.password, results[0].password).then(isOK => {
                    if (isOK) {
                        if (results[0].attempt >= 5 && ((new Date() - results[0].lastLogin) / 1000 / 60) <= 3)
                            index.sendReturn(res, 429, { error: true, message: "Trop de tentative sur l'email " + data.email + " - Veuillez patientez 3min" });
                        else {
                            toUpdate = {
                                lastLogin: new Date(),
                                attempt: 0
                            }
                            idUser = results[0].id
                            bdd.query("UPDATE `users` SET ? WHERE `users`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
                                if (error != null) {
                                    index.sendReturn(res, 401, { error: true, message: "Requête impossible" })
                                } else
                                    index.getUsers(res, ' WHERE id = ' + idUser, 200, "L'utilisateur a été authentifié succès");
                            })
                        }
                    } else {
                        if (results[0].attempt >= 5 && ((new Date() - results[0].lastLogin) / 1000 / 60) <= 3) {
                            index.sendReturn(res, 429, { error: true, message: "Trop de tentative sur l'email " + data.email + " - Veuillez patientez 3min" });
                        } else if (results[0].attempt >= 5 && ((new Date() - results[0].lastLogin) / 1000 / 60) >= 3) {
                            toUpdate = {
                                lastLogin: new Date(),
                                attempt: 1
                            }
                            bdd.query("UPDATE `users` SET ? WHERE `users`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
                                if (error != null) {
                                    index.sendReturn(res, 401, { error: true, message: "Requête impossible" })
                                } else
                                    index.sendReturn(res, 401, { error: true, message: "Votre Email/Password est erronée" });
                            })
                        } else {
                            toUpdate = {
                                lastLogin: new Date(),
                                attempt: results[0].attempt + 1
                            }
                            bdd.query("UPDATE `users` SET ? WHERE `users`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
                                if (error != null) {
                                    index.sendReturn(res, 401, { error: true, message: "Requête impossible" })
                                } else
                                    index.sendReturn(res, 401, { error: true, message: "Votre Email/Password est erronée" });
                            })
                        }
                    }
                });
            }
        });
    }
}