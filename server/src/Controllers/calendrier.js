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
    // Vérification de si les données sont bien présentes dans le body
    let error = false;

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
        if (index.textFormat(data.nomEvent) == false || index.dateFormat(data.dateDebut) == false || index.dateFormat(data.dateFin) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else {
            toInsert = {
                name: data.nomEvent.trim(),
                start: index.changeDateForSQL(data.dateDebut),
                end: index.changeDateForSQL(data.dateFin),
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