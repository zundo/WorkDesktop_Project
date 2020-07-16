const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getProjetsByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'entreprise

    // Récupération des clients de l'entreprise
    index.getProjetsByEntreprise(res, " WHERE `projet`.`id_entreprise` = '" + req.params.id + "'");
}

exports.addProjet = async(req, res) => {
    const data = req.body;

    if (data.id_user == 0 || data.id_user == null || data.id_user == undefined)
        index.sendReturn(res, 401, { error: true, message: "L'id user n'existe pas" })

    if (data.id_entreprise == 0 || data.id_entreprise == null || data.id_entreprise == undefined)
        index.sendReturn(res, 401, { error: true, message: "L'id entreprise n'existe pas" })

    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.nomProjet) == false || index.exist(data.descriptionProjet) == false || index.exist(data.date_debutProjet) == false || index.exist(data.date_finProjet) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        if (index.textFormat(data.nomProjet) == false || index.dateFormatEn(data.date_debutProjet) == false || index.dateFormatEn(data.date_finProjet) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else if (data.date_debutProjet > data.date_finProjet) {
            index.sendReturn(res, 409, {
                error: true,
                message: "La date de début ne peut pas être supérieur à la date de fin"
            })
        } else {
            toInsert = {
                nomProjet: data.nomProjet.trim(),
                descriptionProjet: data.descriptionProjet.trim(),
                date_debutProjet: data.date_debutProjet + " 12:00:00",
                date_finProjet: data.date_finProjet + " 12:00:00",
                id_user: data.id_user,
                id_entreprise: data.id_entreprise
            };

            bdd.query("INSERT INTO projet SET ?", toInsert, (error, results) => {
                if (error) {
                    console.log(error)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "La requête d'insertion en base de donnée n'a pas fonctionné"
                    })
                } else {
                    console.log("Le projet a bien été ajouté")
                    index.sendReturn(res, 201, { error: false, message: "Le projet a bien été crée avec succès" })
                }
            });
        }
    }
}

exports.updateProjet = async(req, res) => {
    index.verifId(req.params.id, res); //id du projet

    const id_projet = req.params.id;
    if (id_projet == 0 || id_projet == null || id_projet == undefined) index.sendReturn(res, 401, { error: true, message: "L'id projet n'existe pas" })

    const data = req.body;
    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.nomProjet) == false || index.exist(data.descriptionProjet) == false || index.exist(data.date_debutProjet) == false || index.exist(data.date_finProjet) == false) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        if (index.textFormat(data.nomProjet) == false || index.dateFormatEn(data.date_debutProjet) == false || index.dateFormatEn(data.date_finProjet) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else if (data.date_debutProjet > data.date_finProjet) {
            index.sendReturn(res, 409, {
                error: true,
                message: "La date de début ne peut pas être supérieur à la date de fin"
            })
        } else {
            // update de projet en base de données
            toUpdate = {
                nomProjet: data.nomProjet.trim(),
                descriptionProjet: data.descriptionProjet.trim(),
                date_debutProjet: data.date_debutProjet + " 12:00:00",
                date_finProjet: data.date_finProjet + " 12:00:00",
            };

            bdd.query("UPDATE `projet` SET ? WHERE `projet`.`id` = '" + id_projet + "'", toUpdate, (error, results) => {
                if (results.affectedRows != 0) {
                    index.sendReturn(res, 200, { error: false, message: "Le projet a été modifiée avec succès" })
                } else if (results.affectedRows == 0) {
                    index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                } else {
                    index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
                }
            });
        }
    }
}

exports.deleteProjet = async(req, res) => {
    index.verifId(req.params.id, res); //id du projet

    // Suppression de l'utilisateur en base de donnée
    bdd.query("DELETE FROM `projet` WHERE `projet`.`id` = '" + req.params.id + "'", (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "Le projet a été supprimé avec succès" })
        } else if (results.length == undefined) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyé n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Erreur lors de la suppression du client" })
        }
    })
}