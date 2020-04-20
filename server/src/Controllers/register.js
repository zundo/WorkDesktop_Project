const express = require('express'),
    index = require('../middleware/filter/index'),
    bdd = require('../modele/index'),
    bcrypt = require('bcrypt')

exports.register = async(req, res) => {
    const data = req.body
    data.id_entreprise = 0;
    //console.log(JSON.stringify(data))

    // Vérification de si les données sont bien présentes dans le body
    let error = false

    //utilisateur
    if (index.exist(data.email) == false || index.exist(data.password) == false || index.exist(data.lastname) == false || index.exist(data.firstname) == false)
        error = true
    if (index.exist(data.date_naissance) == false || index.exist(data.sexe) == false || index.exist(data.rue) == false || index.exist(data.ville) == false)
        error = true
    if (index.exist(data.codePostal) == false || index.exist(data.pays) == false || index.exist(data.phone) == false || index.exist(data.poste) == false)
        error = true
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
        //verification num siret conforme TODO
        if (index.textFormat(data.nom_ent) == false || index.textFormat(data.rue_ent) == false || index.zipFormat(data.codePostal_ent) == false ||
            index.textFormat(data.ville_ent) == false || index.textFormat(data.pays_ent) == false || index.emailFormat(data.email_ent) == false) {
            index.sendReturn(res, 409, {
                error: true,
                message: "L'une des données obligatoire ne sont pas conformes (entreprise)"
            });
        } else {
            // Vérification
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
                        //^^Message d'erreur requête verif email
                } else {
                    // Encryptage du mot de passe
                    data.password = await new Promise(resolve => {
                        bcrypt.genSalt(10, async(err, salt) => {
                            return await bcrypt.hash(data.password, salt, (err, hash) => {
                                resolve(hash)
                            });
                        });
                    })

                    if (index.exist(data.website) == false) data.website = "Inconnu";
                    if (index.exist(data.personne_contacter) == false) data.personne_contacter = "Inconnu";

                    if (index.exist(data.website_ent) == false) data.website_ent = "Inconnu";

                    toInsertEnt = {
                        numSiret: data.numSiret_ent,
                        nom: data.nom_ent.trim(),
                        rue: data.rue_ent.trim(),
                        codePostal: data.codePostal_ent.trim(),
                        ville: data.ville_ent.trim(),
                        pays: data.pays_ent.trim(),
                        email_entreprise: data.email_ent.trim().toLowerCase(),
                        telephone: data.telephone_ent.trim(),
                        site_web: data.website_ent.trim()
                    };

                    bdd.query("INSERT INTO entreprise SET ?", toInsertEnt, (error, resultsEnt) => {
                        if (error) {
                            console.log(error)
                            index.sendReturn(res, 401, {
                                error: true,
                                message: "La requête d'inscription entreprise en base de donnée n'a pas fonctionné"
                            })
                        } else {
                            //index.sendReturn(res, 201, { error: false, message: "L' utilisateur a bien été crée avec succès", id_user: results.insertId })
                            console.log("L'entreprise a bien été ajouté")
                            data.id_entreprise = resultsEnt.insertId;
                            console.log(data.id_entreprise)

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
                                site_web: data.website.trim(),
                                personne_contacter: data.personne_contacter.trim(),
                                phone: data.phone.trim(),
                                poste: data.poste.trim(),
                                id_entreprise: data.id_entreprise
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
                                    index.sendReturn(res, 201, { error: false, message: "L' utilisateur a bien été crée avec succès", id_user: results.insertId })
                                }
                            });
                        }
                    });
                }
            }
        }
    }
}