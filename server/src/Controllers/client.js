const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getClientsByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'utilisateur
    // Récupération des clients de l'entreprise
    index.getClientsByEntreprise(res, " WHERE id_entreprise_utilisateur = '" + req.params.id + "'");
}

exports.deleteClient = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise du client

    // Suppression de l'utilisateur en base de donnée
    bdd.query("DELETE FROM `clients` WHERE `clients`.`id` = '" + req.params.id + "'", (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "Le client a été supprimé avec succès" })
        } else if (results.length == undefined) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyé n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Erreur lors de la suppression du client" })
        }
    })
}