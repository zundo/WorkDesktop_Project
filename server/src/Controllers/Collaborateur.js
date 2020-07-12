const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.addCollaborateur = async(req, res) => {
    const data = req.body;
    // Vérification de si les données sont bien présentes dans le body
    let error = false;

    //utilisateur
    if (index.exist(data.email) == false || index.exist(data.password) == false || index.exist(data.lastname) == false || index.exist(data.firstname) == false)
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
    } else {
        if (index.dateFormat(data.date_naissance) == false || index.emailFormat(data.email) == false || (data.sexe != "Homme" && data.sexe != "Femme") ||
            index.zipFormat(data.codePostal) == false || index.textFormat(data.pays) == false || index.textFormat(data.poste) == false ||
            index.textFormat(data.ville) == false || index.textFormat(data.firstname) == false || index.textFormat(data.lastname) == false ||
            index.textFormat(data.rue) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else {
            // Vérification de si l'email existe déjà
            if (await index.emailExist(data.email)) {
                index.sendReturn(res, 422, {
                    error: true,
                    message: "Votre email n'est pas correct (existe déjà)"
                })
            } else {
                // Encryptage du mot de passe
                data.password = await new Promise(resolve => {
                    bcrypt.genSalt(10, async(err, salt) => {
                        return await bcrypt.hash(data.password, salt, (err, hash) => {
                            resolve(hash)
                        });
                    });
                })

                if (data.id_entreprise == 0) index.sendReturn(res, 401, { error: true, message: "L'id entreprise n'existe pas" })

                // Insertion de l'utilisateur en base de données

                toInsert = {
                    email: data.email.trim().toLowerCase(),
                    password: data.password,
                    lastname: data.lastname.trim(),
                    firstname: data.firstname.trim(),
                    date_naissance: index.changeDateForSQL(data.date_naissance),
                    sexe: data.sexe.trim(),
                    rue: data.rue.trim(),
                    ville: data.ville.trim(),
                    codePostal: data.codePostal.trim(),
                    pays: data.pays.trim(),
                    site_web: index.exist(data.website) == false ? "" : sdata.website.trim(),
                    personne_contacter: index.exist(data.personne_contacter) == false ? "" : data.personne_contacter.trim(),
                    phone: data.phone.trim(),
                    poste: data.poste.trim(),
                    id_entreprise: data.id_entreprise,
                    isAdmin: data.isAdmin
                };

                bdd.query("INSERT INTO utilisateur SET ?", toInsert, (error, results) => {
                    if (error) {
                        console.log(error)
                        index.sendReturn(res, 401, {
                            error: true,
                            message: "La requête d'inscription en base de donnée n'a pas fonctionné"
                        })
                    } else {
                        console.log("L'utilisateur a bien été ajouté")
                        index.sendReturn(res, 201, { error: false, message: "L' utilisateur a bien été crée avec succès" })
                    }
                });
            }
        }
    }
}

exports.deleteCollaborateur = async(req, res) => {
    index.verifId(req.params.id, res); // id_user a supprimé

    // Suppression de l'utilisateur en base de donnée
    bdd.query("DELETE FROM `utilisateur` WHERE `utilisateur`.`id` = '" + req.params.id + "'", (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "Le collaborateur a été supprimé avec succès" })
        } else if (results.length == undefined) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyé n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Erreur lors de la suppression de l' utilisateur" })
        }
    })
}