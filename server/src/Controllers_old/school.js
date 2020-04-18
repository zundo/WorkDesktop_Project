const express = require('express'),
    index = require('../middleware/filter/index_old'),
    bdd = require('../modele/index_old'),
    bcrypt = require('bcrypt')


exports.getSchools = async(req, res) => {
    bdd.query(' SELECT * FROM school; SELECT * FROM faculty', function(error, results, fields) {
        if (error) {
            console.log(error)
            index.sendReturn(res, 200, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
        // Si la liste des utilises est vide
        else if (results.length == 0)
            index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
        else {
            results[0].map(item => {
                let facultyAsSchool = []
                for (i = 0; i < results[1].length; i++) {
                    if (item.id == results[1][i].School_id) {
                        delete results[1][i].School_id
                        delete results[1][i].createdAt
                        delete results[1][i].updateAt
                        facultyAsSchool.push(results[1][i])
                    }
                }
                item.faculty = facultyAsSchool
                delete item.createdAt
                delete item.updateAt
                return item
            })

            index.sendReturn(res, 200, { error: false, schools: results[0] })

        }
    });
}

exports.getSchool = async(req, res) => {
    index.verifId(req.params.id, res);
    bdd.query(' SELECT * FROM school WHERE id = "' + req.params.id + '"; SELECT * FROM faculty WHERE School_id = "' + req.params.id + '"', function(error, results, fields) {
        if (error) {
            console.log(error)
            index.sendReturn(res, 200, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
        // Si la liste des utilises est vide
        else if (results[0].length == 0)
            index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
        else {
            results[0].map(item => {
                let facultyAsSchool = []
                for (i = 0; i < results[1].length; i++) {
                    if (item.id == results[1][i].School_id) {
                        delete results[1][i].School_id
                        delete results[1][i].createdAt
                        delete results[1][i].updateAt
                        facultyAsSchool.push(results[1][i])
                    }
                }
                let createdAt = item.createdAt
                let updateAt = item.updateAt
                delete item.createdAt;
                delete item.updateAt;
                item.faculty = facultyAsSchool
                item.createdAt = createdAt
                item.updateAt = updateAt
                return item
            })

            index.sendReturn(res, 200, { error: false, school: results[0][0] })

        }
    });
}


exports.register = async(req, res) => {
    const data = req.body

    // Vérification de si les données sont bien présentes dans le body
    let error = false
    if (index.exist(data.name) == false)
        error = true
    if (index.exist(data.street) == false)
        error = true
    if (index.exist(data.zip) == false)
        error = true
    if (index.exist(data.city) == false)
        error = true
    if (error == true)
        index.sendReturn(res, 403, { error: true, message: "L'une ou plusieurs données obligatoire sont manquantes" })
    else {
        // Vérification du format du zip et des caractère spéciaux
        if (index.zipFormat(data.zip) == false || index.textFormat(data.name) == false || index.textFormat(data.street) == false || index.textFormat(data.city) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
        else {
            // Vérification de si le nom de l'école existe déjà
            if (await index.nameExistS(data.name))
                index.sendReturn(res, 422, { error: true, message: "Le name déjà utilisé" })
                //^^Message d'erreur requête verif email
            else {
                // Insertion de l'école en base de données
                toInsert = {
                    name: data.name.trim(),
                    street: data.street.trim(),
                    zip: data.zip.trim(),
                    city: data.city.trim().toLowerCase(),
                };

                bdd.query("INSERT INTO school SET ?", toInsert, (error, results) => {
                    if (error) {
                        console.log(error)
                        index.sendReturn(res, 401, { error: true, message: "La requête d'inscription en base de donnée n'a pas fonctionné" })
                    } else {
                        bdd.query(' SELECT * FROM school WHERE id = "' + results.insertId + '"; SELECT * FROM faculty WHERE School_id = "' + results.insertId + '"', function(error, results, fields) {
                            if (error) {
                                console.log(error)
                                index.sendReturn(res, 200, { error: false, message: "Erreur dans la requête" });
                            }
                            // Si le resultat n'existe pas
                            else if (results === undefined)
                                index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
                            // Si la liste des utilises est vide
                            else if (results.length == 0)
                                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                            else {
                                results[0].map(item => {
                                    let facultyAsSchool = []
                                    for (i = 0; i < results[1].length; i++) {
                                        if (item.id == results[1][i].School_id) {
                                            delete results[1][i].School_id
                                            facultyAsSchool.push(results[1][i])
                                        }
                                    }
                                    let createdAt = item.createdAt
                                    let updateAt = item.updateAt
                                    delete item.createdAt;
                                    delete item.updateAt;
                                    item.faculty = facultyAsSchool
                                    item.createdAt = createdAt
                                    item.updateAt = updateAt
                                    return item
                                })

                                index.sendReturn(res, 201, { error: false, message: "L'ecole a bien été créé avec succès", school: results[0][0] })

                            }
                        });
                    }
                });
            }
        }
    }
}


exports.updateSchool = async(req, res) => {
    index.verifId(req.params.id, res)
    const data = req.body;
    if (data.zip == undefined && data.city == undefined && data.street == undefined && data.name == undefined)
        index.sendReturn(res, 401, { error: true, message: "Aucun données n'a été envoyée" })
    if (data.zip != undefined) {
        if (index.zipFormat(data.zip) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.name != undefined) {
        if (index.textFormat(data.name) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.street != undefined) {
        if (index.textFormat(data.street) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.city != undefined) {
        if (index.textFormat(data.city) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }

    // Vérification de si le nom de l'école existe déjà
    if (data.name != undefined && await index.nameExistS(data.name))
        index.sendReturn(res, 422, { error: true, message: "Le name déjà utilisé" })
    else {
        // Si tout est ok Modification en base de donnée
        toUpdate = {}
        if (index.exist(data.name))
            toUpdate.name = data.name
        if (index.exist(data.street))
            toUpdate.street = data.street
        if (index.exist(data.zip))
            toUpdate.zip = data.zip
        if (index.exist(data.city))
            toUpdate.city = data.city

        // modification de la date d'update
        toUpdate.updateAt = new Date()
        bdd.query("UPDATE `school` SET ? WHERE `school`.`id` = '" + req.params.id + "'", toUpdate, (error, results) => {
            if (results.affectedRows != 0) {
                index.sendReturn(res, 200, { error: false, message: "L'école a été modifiée avec succès" })
            } else if (results.affectedRows == 0) {
                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
            } else {
                index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
            }
        })
    }
}