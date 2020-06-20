const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getFacturesByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'entreprise

    // Récupération des clients de l'entreprise
    index.getFacturesByEntreprise(res, " WHERE `facture`.`id_entreprise_utilisateur` = '" + req.params.id + "'");
}
exports.addFacture = async(req, res) => {
    const data = req.body;

    if (data.id_entreprise_utilisateur == 0 || data.id_entreprise_utilisateur == null || data.id_entreprise_utilisateur == undefined) 
        index.sendReturn(res, 401, { error: true, message: "L'id entreprise user n'existe pas" })

    if (data.id_client == 0 || data.id_client == null || data.id_client == undefined) 
        index.sendReturn(res, 401, { error: true, message: "L'id client n'existe pas" })
    
    // Vérification de si les données sont bien présentes dans le body
    if (index.exist(data.titre) == false || index.exist(data.statut) == false || index.exist(data.date) == false ||
        index.exist(data.montant) == false || index.exist(data.description) == false){
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    }else{
        if (index.textFormat(data.titre) == false || index.floatFormat(data.montant) == false || index.dateFormat(data.date) == false){
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        }else{
            toInsert = {
                titre: data.titre.trim(),
                statut: data.statut.trim(),
                date: index.changeDateForSQL(data.date),
                montant: data.montant.trim(),
                description: data.description.trim(),
                id_entreprise_utilisateur: data.id_entreprise_utilisateur,
                id_client: data.id_client
            };

            bdd.query("INSERT INTO facture SET ?", toInsert, (error, results) => {
                if (error) {
                    console.log(error)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "La requête d'insertion en base de donnée n'a pas fonctionné"
                    })
                } else {
                    console.log("La facture a bien été ajouté")
                    index.sendReturn(res, 201, { error: false, message: "La facture a bien été crée avec succès" })
                }
            });
        }
    }
}

exports.updateFacture = async(req,res) => {
    index.verifId(req.params.id, res); //id du clients
    const id_client = req.params.id;
    if (id_client == 0 || id_client == null || id_client == undefined) index.sendReturn(res, 401, { error: true, message: "L'id client n'existe pas" })

    const data = req.body;

    // Vérification de si les données sont bien présentes dans le body
}

exports.deleteFacture = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise du client

    // Suppression de l'utilisateur en base de donnée
    bdd.query("DELETE FROM `facture` WHERE `facture`.`id_f` = '" + req.params.id + "'", (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "La facture a été supprimé avec succès" })
        } else if (results.length == undefined) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyé n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Erreur lors de la suppression du client" })
        }
    })
}