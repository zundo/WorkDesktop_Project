const express = require('express'),
    index = require('../middleware/filter/index_old'),
    bdd = require('../modele/index_old'),
    bcrypt = require('bcrypt')

exports.register = async(req, res) => {
    const data = req.body
        // Vérification de si les données sont bien présentes dans le body
    let error = false
    if (index.exist(data.firstname) == false)
        error = true
    if (index.exist(data.lastname) == false)
        error = true
    if (index.exist(data.email) == false)
        error = true
    if (index.exist(data.password) == false)
        error = true
    if (index.exist(data.date_naissance) == false)
        error = true
    if (index.exist(data.sexe) == false)
        error = true
    if (error == true)
        index.sendReturn(res, 403, { error: true, message: "L'une ou plusieurs données obligatoire sont manquantes" })
    else {
        // Vérification du format de la date, de l'email et du sexe
        if (index.dateFormat(data.date_naissance) == false || index.emailFormat(data.email) == false || (data.sexe != "Homme" && data.sexe != "Femme"))
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
        else {
            // Vérification de si l'email existe déjà
            if (await index.emailExist(data.email))
                index.sendReturn(res, 422, { error: true, message: "Votre email n'est pas correct" })
                //^^Message d'erreur requête verif email
            else {

                // Encryptage du mot de passe
                data.password = await new Promise(resolve => {
                    bcrypt.genSalt(10, async(err, salt) => {
                        return await bcrypt.hash(data.password, salt, (err, hash) => {
                            resolve(hash)
                        });
                    });
                })

                // Insertion de l'utilisateur en base de données
                toInsert = {
                    firstname: data.firstname.trim(),
                    lastname: data.lastname.trim(),
                    password: data.password,
                    email: data.email.trim().toLowerCase(),
                    sexe: data.sexe.trim(),
                    "date-naissance": index.changeDateForSQL(data.date_naissance)
                };

                if (index.exist(data.type)) {
                    if (data.type == "Studiant" && data.type == "Intervenant") {
                        toInsert.type = data.type
                    } else {
                        index.sendReturn(res, 409, { error: true, message: "Le type n'est pas conforme" })
                    }
                }

                bdd.query("INSERT INTO users SET ?", toInsert, (error, results) => {
                    if (error) {
                        console.log(error)
                        index.sendReturn(res, 401, { error: true, message: "La requête d'inscription en base de donnée n'a pas fonctionné" })
                    } else
                        index.getUsers(res, " WHERE id = " + results.insertId, 201, "L' utilisateur a bien été crée avec succès")
                });
            }
        }
    }
}