const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    config = require('../config/index')

exports.login = (req, res) => {
    const data = req.body;
    if (index.exist(data.email) == false || index.exist(data.password) == false) {
        index.sendReturn(res, 403, { error: true, message: "L'email/password est manquant" })
    }
    if (index.emailFormat(data.email) == false) {
        index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    } else {
        bdd.query(" SELECT * FROM utilisateur WHERE email = '" + data.email + "'", (error, results) => {
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
                            idUser = results[0].id;
                            isAdmin = results[0].isAdmin;
                            id_entreprise = results[0].id_entreprise;

                            const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) /* * 24 * 7*/ , // 1H
                                idUser: idUser,
                                isAdmin: isAdmin,
                                id_entreprise: id_entreprise
                            }, config.keyToken)

                            toUpdate = {
                                token: token,
                                lastLogin: new Date(),
                                attempt: 0
                            }

                            /*jwt.verify(token, config.keyToken, function(err, decoded) {
                                console.log(decoded.idUser) 
                                console.log(decoded.isAdmin) 
                                console.log(decoded.id_entreprise) 
                            });*/

                            bdd.query("UPDATE `utilisateur` SET ? WHERE `utilisateur`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
                                if (error != null) {
                                    index.sendReturn(res, 401, { error: true, message: "Requête impossible" })
                                } else {
                                    console.log("L'utilisateur a été authentifié succès");
                                    //localStorage.setItem("token", token);
                                    index.sendReturn(res, 201, { error: false, message: "L'utilisateur a été authentifié succès", token: token, id_user: idUser, isAdmin: isAdmin, id_entreprise: id_entreprise });
                                }
                            });
                        }
                    } else {
                        if (results[0].attempt >= 5 && ((new Date() - results[0].lastLogin) / 1000 / 60) <= 3) {
                            index.sendReturn(res, 429, { error: true, message: "Trop de tentative sur l'email " + data.email + " - Veuillez patientez 3min" });
                        } else if (results[0].attempt >= 5 && ((new Date() - results[0].lastLogin) / 1000 / 60) >= 3) {
                            toUpdate = {
                                lastLogin: new Date(),
                                attempt: 1
                            }
                            bdd.query("UPDATE `utilisateur` SET ? WHERE `utilisateur`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
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
                            bdd.query("UPDATE `utilisateur` SET ? WHERE `utilisateur`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
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