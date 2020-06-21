const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getTicketsByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'entreprise

    // Récupération des clients de l'entreprise
    index.getTicketsByEntreprise(res, " WHERE `ticket`.`id_entreprise` = '" + req.params.id + "'");
}

exports.addTicket = async(req, res) => {
    const data = req.body;

    if (data.id_user == 0 || data.id_user == null || data.id_user == undefined)
        index.sendReturn(res, 401, { error: true, message: "L'id user n'existe pas" })

    if (data.id_entreprise == 0 || data.id_entreprise == null || data.id_entreprise == undefined)
        index.sendReturn(res, 401, { error: true, message: "L'id entreprise n'existe pas" })

    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.sujet) == false || index.exist(data.theme) == false || index.exist(data.contenu) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        if (index.textFormat(data.sujet) == false || index.textFormat(data.theme) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else {
            toInsert = {
                sujet: data.sujet.trim(),
                theme: data.theme.trim(),
                contenu: data.contenu.trim(),
                reponseSupport: "",
                status: "En attente support",
                id_user: data.id_user,
                id_entreprise: data.id_entreprise
            };

            bdd.query("INSERT INTO ticket SET ?", toInsert, (error, results) => {
                if (error) {
                    console.log(error)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "La requête d'insertion en base de donnée n'a pas fonctionné"
                    })
                } else {
                    console.log("Le ticket a bien été ajouté")
                    index.sendReturn(res, 201, { error: false, message: "Le ticket a bien été ajouté avec succès" })
                }
            });
        }
    }
}

exports.reponseTicket = async(req, res) => {
    index.verifId(req.params.id, res); //id du ticket

    const id_ticket = req.params.id;
    if (id_ticket == 0 || id_ticket == null || id_ticket == undefined) index.sendReturn(res, 401, { error: true, message: "L'id ticket n'existe pas" })

    const data = req.body;
    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.reponseSupport) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        // update de la reponse support en base de données
        toUpdate = {
            reponseSupport: data.reponseSupport.trim(),
            status: "Répondu",
        };

        bdd.query("UPDATE `ticket` SET ? WHERE `ticket`.`id` = '" + req.params.id + "'", toUpdate, (error, results) => {
            if (results.affectedRows != 0) {
                index.sendReturn(res, 200, { error: false, message: "La réponse du ticket a été appliquer avec succès" })
            } else if (results.affectedRows == 0) {
                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
            } else {
                index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
            }
        });
    }
}

exports.cloreTicket = async(req, res) => {
    index.verifId(req.params.id, res); //id du ticket

    toUpdate = {
        status: "Résolu"
    };

    bdd.query("UPDATE `ticket` SET ? WHERE `ticket`.`id` = '" + req.params.id + "'", toUpdate, (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "Le ticket a été Résolu ou Fermé avec succès" })
        } else if (results.affectedRows == 0) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
        }
    });
}