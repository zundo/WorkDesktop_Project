const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getEntreprise = async(req, res) => {
    index.verifId(req.params.id, res); //id entreprise

    // Récupération des entreprises
    bdd.query("SELECT `entreprise`.* FROM `entreprise` WHERE `entreprise`.`id` = '" + req.params.id + "'", (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            index.sendReturn(res, 500, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            index.sendReturn(res, 500, { error: false, message: "Aucun résultat pour la requête" });
        // Si la liste des utilises est vide
        else if (results.length == 0)
            index.sendReturn(res, 409, { error: true, message: "Aucune entreprise présente" })
        else {
            if (results.length > 0) {
                //console.log(JSON.stringify(results));
                index.sendReturn(res, 200, {
                    error: false,
                    entreprise: results
                })
            } else {
                index.sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}

exports.addEntreprise = async(req, res) => {
    const data = req.body

    // Vérification de si les données sont bien présentes dans le body
    let error = false

    //entreprise
    if (index.exist(data.numSiret_ent) == false || index.exist(data.nom_ent) == false || index.exist(data.rue_ent) == false || index.exist(data.codePostal_ent) == false)
        error = true
    if (index.exist(data.ville_ent) == false || index.exist(data.pays_ent) == false || index.exist(data.email_ent) == false || index.exist(data.telephone_ent) == false)
        error = true

    if (error == true) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        //verification 
        if (index.textFormat(data.nom_ent) == false || index.textFormat(data.rue_ent) == false || index.zipFormat(data.codePostal_ent) == false || data.numSiret_ent.length != 13 ||
            index.textFormat(data.ville_ent) == false || index.textFormat(data.pays_ent) == false || index.emailFormat(data.email_ent) == false || index.numberFormat(data.numSiret_ent) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes (entreprise)"
            });
        } else {
            toInsertEnt = {
                numSiret: data.numSiret_ent,
                nom: data.nom_ent.trim(),
                rue: data.rue_ent.trim(),
                codePostal: data.codePostal_ent.trim(),
                ville: data.ville_ent.trim(),
                pays: data.pays_ent.trim(),
                email_entreprise: data.email_ent.trim().toLowerCase(),
                telephone: data.telephone_ent.trim(),
                site_web: index.exist(data.website_ent) == false ? "" : data.website_ent.trim()
            };

            bdd.query("INSERT INTO entreprise SET ?", toInsertEnt, (error, results) => {
                if (error) {
                    console.log(error)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "La requête d'inscription entreprise en base de donnée n'a pas fonctionné"
                    })
                } else {
                    console.log("L'entreprise a bien été ajouté")
                    index.sendReturn(res, 200, { error: false, message: "L'entreprise a bien été ajouté" })
                }
            });
        }
    }
}

exports.updateEntreprise = async(req, res) => {
    index.verifId(req.params.id, res); //id entreprise
    const id_entreprise = req.params.id;

    if (id_entreprise == 0 || id_entreprise == null || id_entreprise == undefined) index.sendReturn(res, 401, { error: true, message: "L'id entreprise n'existe pas" })

    const data = req.body;
    // Vérification de si les données sont bien présentes dans le body
    let error = false

    //entreprise
    if (index.exist(data.numSiret_ent) == false || index.exist(data.nom_ent) == false || index.exist(data.rue_ent) == false || index.exist(data.codePostal_ent) == false)
        error = true
    if (index.exist(data.ville_ent) == false || index.exist(data.pays_ent) == false || index.exist(data.email_ent) == false || index.exist(data.telephone_ent) == false)
        error = true

    if (error == true) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        //verification 
        if (index.textFormat(data.nom_ent) == false || index.textFormat(data.rue_ent) == false || index.zipFormat(data.codePostal_ent) == false || data.numSiret_ent.length != 14 ||
            index.textFormat(data.ville_ent) == false || index.textFormat(data.pays_ent) == false || index.emailFormat(data.email_ent) == false || index.numberFormat(data.numSiret_ent) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes (entreprise)"
            });
        } else {
            toUpdateEnt = {
                numSiret: data.numSiret_ent,
                nom: data.nom_ent.trim(),
                rue: data.rue_ent.trim(),
                codePostal: data.codePostal_ent.trim(),
                ville: data.ville_ent.trim(),
                pays: data.pays_ent.trim(),
                email_entreprise: data.email_ent.trim().toLowerCase(),
                telephone: data.telephone_ent.trim(),
                site_web: index.exist(data.website_ent) == false ? "" : data.website_ent.trim()
            };

            bdd.query("UPDATE `entreprise` SET ? WHERE `entreprise`.`id` = '" + id_entreprise + "'", toUpdateEnt, (error, results) => {
                if (results.affectedRows != 0) {
                    index.sendReturn(res, 200, { error: false, message: "L'entreprise a été modifiée avec succès" })
                } else if (results.affectedRows == 0) {
                    index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                } else {
                    index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
                }
            });
        }
    }
}