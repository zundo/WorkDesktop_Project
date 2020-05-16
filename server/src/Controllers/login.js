const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

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
                            toUpdate = {
                                lastLogin: new Date(),
                                attempt: 0
                            }
                            idUser = results[0].id;
                            isAdmin = results[0].isAdmin;
                            id_entreprise = results[0].id_entreprise;
                            bdd.query("UPDATE `utilisateur` SET ? WHERE `utilisateur`.`id` = '" + results[0].id + "'", toUpdate, (error, results) => {
                                if (error != null) {
                                    index.sendReturn(res, 401, { error: true, message: "Requête impossible" })
                                } else {
                                    //console.log("L'utilisateur a été authentifié succès")
                                    index.sendReturn(res, 201, { error: false, message: "L'utilisateur a été authentifié succès", id_user: idUser, isAdmin: isAdmin, id_entreprise: id_entreprise });
                                    //index.getUsers(res, ' WHERE id = ' + idUser, 200, "L'utilisateur a été authentifié succès");
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