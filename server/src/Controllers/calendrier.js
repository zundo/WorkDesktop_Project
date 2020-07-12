const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getEvenements = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'entreprise

    // Récupération des evenements de l'entreprise
    index.getEvenementsByEntreprise(res, " WHERE `calendrier`.`id_entreprise` = '" + req.params.id + "'");
}

exports.addEvenement = async(req, res) => {
    const data = req.body;

    if (data.id_entreprise == 0 || data.id_entreprise == null || data.id_entreprise == undefined)
        index.sendReturn(res, 401, { error: true, message: "L'id entreprise n'existe pas" })

    if (data.id_user == 0 || data.id_user == null || data.id_user == undefined)
        index.sendReturn(res, 401, { error: true, message: "L'id user n'existe pas" })

    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.nomEvent) == false || index.exist(data.dateDebut) == false || index.exist(data.dateFin) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        if (index.textFormat(data.nomEvent) == false || index.dateFormatEn(data.dateDebut) == false || index.dateFormatEn(data.dateFin) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else if (data.dateDebut > data.dateFin) {
            index.sendReturn(res, 409, {
                error: true,
                message: "La date de début ne peut pas être supérieur à la date de fin"
            })
        } else {
            toInsert = {
                name: data.nomEvent.trim(),
                start: data.dateDebut + " 12:00:00",
                end: data.dateFin + " 12:00:00",
                id_user: data.id_user,
                id_entreprise: data.id_entreprise
            };

            bdd.query("INSERT INTO calendrier SET ?", toInsert, (error, results) => {
                if (error) {
                    console.log(error)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "La requête d'inscription en base de donnée n'a pas fonctionné"
                    })
                } else {
                    console.log("L'événement a bien été ajouté")
                    index.sendReturn(res, 201, { error: false, message: "L'événement a bien été ajouté avec succès" })
                }
            });
        }
    }
}

exports.updateEvenement = async(req, res) => {
    index.verifId(req.params.id, res); //id evenement
    const id_evenement = req.params.id;

    const data = req.body;
    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.nomEvent) == false || index.exist(data.dateDebut) == false || index.exist(data.dateFin) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        if (index.textFormat(data.nomEvent) == false || index.dateFormatEn(data.dateDebut) == false || index.dateFormatEn(data.dateFin) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else if (data.dateDebut > data.dateFin) {
            index.sendReturn(res, 409, {
                error: true,
                message: "La date de début ne peut pas être supérieur à la date de fin"
            })
        } else {
            // update de l eveneent
            toUpdate = {
                name: data.nomEvent.trim(),
                start: data.dateDebut + " 12:00:00",
                end: data.dateFin + " 12:00:00",
            };

            bdd.query("UPDATE `calendrier` SET ? WHERE `calendrier`.`id` = '" + id_evenement + "'", toUpdate, (error, results) => {
                if (results.affectedRows != 0) {
                    index.sendReturn(res, 200, { error: false, message: "Le calendrier a été modifiée avec succès" })
                } else if (results.affectedRows == 0) {
                    index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                } else {
                    index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
                }
            });
        }
    }
}

exports.deleteEvenement = (req, res) => {
    index.verifId(req.params.id, res); //id evenement

    // Suppression de evenement en base de donnée
    bdd.query("DELETE FROM `calendrier` WHERE `calendrier`.`id` = '" + req.params.id + "'", (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "L'evenement a été supprimé avec succès" })
        } else if (results.length == undefined) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyé n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Erreur lors de la suppression du client" })
        }
    })
}