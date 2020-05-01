const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.getUtilisateur = (req, res) => {
    index.verifId(req.params.id, res); //id_user
    // Récupération d'un utilisateur unique
    index.getUser(res, " WHERE id = '" + req.params.id + "'")
}

exports.updateUtilisateur = async(req, res) => {
    index.verifId(req.params.id, res); //id_user
    const id_user = req.params.id;
    const data = req.body;
    //console.log(data)

    // Vérification de si les données sont bien présentes dans le body
    let error = false

    //utilisateur
    if (index.exist(data.lastname) == false || index.exist(data.firstname) == false || index.exist(data.date_naissance) == false)
        error = true
    if (index.exist(data.sexe) == false || index.exist(data.rue) == false || index.exist(data.ville) == false)
        error = true
    if (index.exist(data.codePostal) == false || index.exist(data.pays) == false || index.exist(data.phone) == false || index.exist(data.poste) == false)
        error = true

    if (error === true) {
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    } else {
        if (index.dateFormat(data.date_naissance) == false || (data.sexe != "Homme" && data.sexe != "Femme") ||
            index.zipFormat(data.codePostal) == false || index.textFormat(data.pays) == false || index.textFormat(data.poste) == false ||
            index.textFormat(data.ville) == false || index.textFormat(data.firstname) == false || index.textFormat(data.lastname) == false ||
            index.textFormat(data.rue) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes"
            })
        } else {
            if (index.exist(data.site_web) == false) data.site_web = "Inconnu";
            if (index.exist(data.personne_contacter) == false) data.personne_contacter = "Inconnu";

            // update de l'utilisateur en base de données
            toUpdate = {
                lastname: data.lastname.trim(),
                firstname: data.firstname.trim(),
                date_naissance: index.changeDateForSQL(data.date_naissance),
                sexe: data.sexe.trim(),
                rue: data.rue.trim(),
                ville: data.ville.trim(),
                codePostal: data.codePostal.trim(),
                pays: data.pays.trim(),
                site_web: data.site_web.trim(),
                personne_contacter: data.personne_contacter.trim(),
                phone: data.phone.trim(),
                poste: data.poste.trim(),
                updateAt: new Date()
            };
            bdd.query("UPDATE `utilisateur` SET ? WHERE `utilisateur`.`id` = '" + id_user + "'", toUpdate, (error, results) => {
                if (results.affectedRows != 0) {
                    index.sendReturn(res, 200, { error: false, message: "L'utilisateur a été modifiée avec succès" })
                } else if (results.affectedRows == 0) {
                    index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                } else {
                    index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
                }
            });
        }
    }
}

exports.editPasswordUtilisateur = async(req, res) => {
    index.verifId(req.params.id, res); //id_user
    const id_user = req.params.id;
    const data = req.body;
    if (index.exist(data.old_password) === false && index.exist(data.new_password) === false)
        index.sendReturn(res, 403, {
            error: true,
            message: "L'une ou plusieurs données obligatoire sont manquantes"
        })
    else {
        bdd.query(" SELECT password FROM utilisateur WHERE utilisateur.id = '" + id_user + "'", async(error, results) => {
            if (error != null) {
                index.sendReturn(res, 401, {
                    error: true,
                    message: "Requête impossible"
                })
            } else if (results.length == 0) {
                index.sendReturn(res, 401, {
                    error: true,
                    message: "Mot de passe erroné"
                });
            } else {
                const isPasswordValid = await bcrypt.compare(data.old_password, results[0].password);
                if (!isPasswordValid)
                    index.sendReturn(res, 401, {
                        error: true,
                        message: "Erreur sur le mot de passe actuel ! Réessayer"
                    })
                else {
                    data.new_password = await new Promise(resolve => {
                        bcrypt.genSalt(10, async(err, salt) => {
                            return await bcrypt.hash(data.new_password, salt, (err, hash) => {
                                resolve(hash)
                            });
                        });
                    });
                    toUpdate = {
                        updateAt: new Date(),
                        password: data.new_password
                    }
                    bdd.query("UPDATE `utilisateur` SET ? WHERE `utilisateur`.`id` = '" + id_user + "'", toUpdate, (error, results) => {
                        if (error != null) {
                            index.sendReturn(res, 401, {
                                error: true,
                                message: "Requête impossible"
                            })
                        } else {
                            index.sendReturn(res, 201, {
                                error: false,
                                message: "Modification du mot de passe effectuée !"
                            });
                        }
                    });
                }
            }
        });
    }
}

exports.getUsersByEnt = async(req, res) => {
    index.verifId(req.params.id, res); //id_user
    // Récupération de l'id de l'entreprise
    bdd.query("SELECT id_entreprise FROM `utilisateur` WHERE utilisateur.id=" + req.params.id, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            index.sendReturn(res, 401, {
                error: false,
                message: "Erreur dans la requête"
            });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            index.sendReturn(res, 401, {
                error: false,
                message: "Aucun résultat pour la requête"
            });
        // Si la liste des utilises est vide
        else if (results.length == 0)
            index.sendReturn(res, 409, {
                error: true,
                message: "L'id envoyez n'existe pas"
            })
        else {
            if (results.length > 0) {
                // Récupération des users de l'entreprise
                index.getUsersByEntreprise(res, " WHERE id_entreprise = '" + results[0].id_entreprise + "'")
            } else {
                index.sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}