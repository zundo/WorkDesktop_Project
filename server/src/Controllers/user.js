const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getUtilisateur = async(req, res) => {
    index.verifId(req.params.id, res); //id_user

    // Récupération d'un utilisateur unique
    index.getUser(res, " WHERE id = '" + req.params.id + "'")
}

exports.getUsersByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_user
    // Récupération de l'id de l'entreprise
    bdd.query("SELECT id_entreprise FROM `utilisateur` WHERE utilisateur.id=" + req.params.id, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            index.sendReturn(res, 401, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            index.sendReturn(res, 401, { error: false, message: "Aucun résultat pour la requête" });
        // Si la liste des utilises est vide
        else if (results.length == 0)
            index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
        else {
            if (results.length > 0) {
                // Récupération des users de l'entreprise
                index.getUsersByEntreprise(res, " WHERE id_entreprise = '" + results[0].id_entreprise + "'")
            } else {
                index.sendReturn(res, 401, { error: true, message: "La requête en base de donnée n'a pas fonctionné" })
            }
        }
    });
}