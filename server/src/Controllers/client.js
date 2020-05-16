const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getClientsByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'utilisateur
    // Récupération des clients de l'entreprise
    index.getClientsByEntreprise(res, " WHERE id_entreprise_utilisateur = '" + req.params.id + "'");
}