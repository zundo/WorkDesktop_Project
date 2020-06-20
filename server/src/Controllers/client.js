const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getClientsByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_entreprise de l'utilisateur
    // Récupération des clients de l'entreprise
    index.getClientsByEntreprise(res, " WHERE id_entreprise_utilisateur = '" + req.params.id + "'");
}

exports.addClient = async(req, res) => {
    const data = req.body;
    // Vérification de si les données sont bien présentes dans le body
    let error = false;

    if (index.exist(data.client) == false) index.sendReturn(res, 401, { error: true, message: "L'id client n'existe pas" })
    if (index.exist(data.id_entreprise_utilisateur) == false) index.sendReturn(res, 401, { error: true, message: "L'id entreprise user n'existe pas" })

    if (index.exist(data.email) == false || index.exist(data.lastname) == false || index.exist(data.firstname) == false)
        error = true
    if (index.exist(data.date_naissance) == false || index.exist(data.sexe) == false || index.exist(data.rue) == false || index.exist(data.ville) == false)
        error = true
    if (index.exist(data.codePostal) == false || index.exist(data.pays) == false || index.exist(data.phone) == false || index.exist(data.poste) == false)
        error = true

    if (error == true) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    }else{
        if (index.dateFormat(data.date_naissance) == false || index.emailFormat(data.email) == false || (data.sexe != "Homme" && data.sexe != "Femme") ||
            index.zipFormat(data.codePostal) == false || index.textFormat(data.pays) == false || index.textFormat(data.poste) == false ||
            index.textFormat(data.ville) == false || index.textFormat(data.firstname) == false || index.textFormat(data.lastname) == false ||
            index.textFormat(data.rue) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        }else{
            if (index.exist(data.site_web) == false) data.site_web = "Inconnu";
            
            if (data.id_entreprise_utilisateur == 0 || data.id_entreprise_utilisateur == null || data.id_entreprise_utilisateur == undefined) 
                index.sendReturn(res, 401, { error: true, message: "L'id entreprise user n'existe pas" })
            
            if (data.id_entreprise_client == 0 || data.id_entreprise_client == null || data.id_entreprise_client == undefined) 
                index.sendReturn(res, 401, { error: true, message: "L'id entreprise client n'existe pas" })
            
            toInsert = {
                email: data.email.trim().toLowerCase(),
                lastname: data.lastname.trim(),
                firstname: data.firstname.trim(),
                date_naissance: index.changeDateForSQL(data.date_naissance),
                sexe: data.sexe.trim(),
                rue: data.rue.trim(),
                codePostal: data.codePostal.trim(),
                ville: data.ville.trim(),
                pays: data.pays.trim(),
                site_web: data.site_web.trim(),
                phone: data.phone.trim(),
                poste: data.poste.trim(),
                id_entreprise_client: data.id_entreprise_client,
                id_entreprise_utilisateur: data.id_entreprise_utilisateur,
            };

            bdd.query("INSERT INTO clients SET ?", toInsert, (error, results) => {
                if (error) {
                    console.log(error)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "La requête d'inscription en base de donnée n'a pas fonctionné"
                    })
                } else {
                    console.log("Le client a bien été ajouté")
                    index.sendReturn(res, 201, { error: false, message: "Le client a bien été crée avec succès" })
                }
            });
        }
    }
}

exports.updateClient = async(req, res) => {
    index.verifId(req.params.id, res); //id du clients
    const id_client = req.params.id;
    if (id_client == 0 || id_client == null || id_client == undefined) index.sendReturn(res, 401, { error: true, message: "L'id client n'existe pas" })

    const data = req.body;

    // Vérification de si les données sont bien présentes dans le body
    let error = false;

    //client
    if (index.exist(data.id_entreprise_utilisateur) == false || index.exist(data.id_entreprise_client) == false)
        error = true
    if (index.exist(data.email) == false || index.exist(data.lastname) == false || index.exist(data.firstname) == false)
        error = true
    if (index.exist(data.date_naissance) == false || index.exist(data.sexe) == false || index.exist(data.rue) == false || index.exist(data.ville) == false)
        error = true
    if (index.exist(data.codePostal) == false || index.exist(data.pays) == false || index.exist(data.phone) == false || index.exist(data.poste) == false)
        error = true

    if (error == true) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    }else{
        if (index.dateFormat(data.date_naissance) == false || index.emailFormat(data.email) == false || (data.sexe != "Homme" && data.sexe != "Femme") ||
            index.zipFormat(data.codePostal) == false || index.textFormat(data.pays) == false || index.textFormat(data.poste) == false ||
            index.textFormat(data.ville) == false || index.textFormat(data.firstname) == false || index.textFormat(data.lastname) == false ||
            index.textFormat(data.rue) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        }else{
            // update du client en base de données
            toUpdate = {
                email: data.email.trim().toLowerCase(),
                lastname: data.lastname.trim(),
                firstname: data.firstname.trim(),
                date_naissance: index.changeDateForSQL(data.date_naissance),
                sexe: data.sexe.trim(),
                rue: data.rue.trim(),
                codePostal: data.codePostal.trim(),
                ville: data.ville.trim(),
                pays: data.pays.trim(),
                site_web: data.site_web.trim(),
                phone: data.phone.trim(),
                poste: data.poste.trim(),
            };

            bdd.query("UPDATE `clients` SET ? WHERE `clients`.`id` = '" + id_client + "'", toUpdate, (error, results) => {
                if (results.affectedRows != 0) {
                    index.sendReturn(res, 200, { error: false, message: "Le client a été modifiée avec succès" })
                } else if (results.affectedRows == 0) {
                    index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                } else {
                    index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
                }
            });
        }
    }
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