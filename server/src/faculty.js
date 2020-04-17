const express = require('express'),
    index = require('../index'),
    bdd = require('./modele/index'),
    bcrypt = require('bcrypt')

exports.register = async(req, res) => {
    index.verifId(req.params.id, res)
    const data = req.body
        // Vérification de si les données sont bien présentes dans le body
    let error = false
    if (index.exist(data.name) == false)
        error = true
    if (index.exist(data.nb_students) == false)
        error = true
    if (index.exist(data.diploma) == false)
        error = true
    if (index.exist(data.nb_year) == false)
        error = true
    if (error == true)
        index.sendReturn(res, 403, { error: true, message: "L'une ou plusieurs données obligatoire sont manquantes" })
    else {
        // Vérification du format du zip et des caractère spéciaux
        if (index.textFormat(data.name) == false || (data.diploma != 1 && data.diploma != 0) || isNaN(data.nb_year) || isNaN(data.nb_students))
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
        else {
            // Vérification de si le nom de la faculty existe déjà
            if (await index.nameExistF(data.name))
                index.sendReturn(res, 422, { error: true, message: "Le name déjà utilisé" })
                //^^Message d'erreur requête verif email
            else {
                // Insertion de l'école en base de données
                toInsert = {
                    name: data.name.trim(),
                    nb_studient: data.nb_students.trim(),
                    diploma: data.diploma.trim(),
                    nb_year: data.nb_year.trim(),
                    School_id: req.params.id
                };

                bdd.query("INSERT INTO faculty SET ?", toInsert, (error, results) => {
                    if (error) {
                        console.log(error)
                        index.sendReturn(res, 401, { error: true, message: "La requête d'inscription en base de donnée n'a pas fonctionné" })
                    } else {
                        bdd.query(' SELECT * FROM school WHERE id = "' + req.params.id + '"; SELECT * FROM faculty WHERE id = "' + results.insertId + '"', function(error, results, fields) {
                            if (error) {
                                index.sendReturn(res, 200, { error: true, message: "Erreur dans la requête" });
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
                                    let createdAt = item.createdAt
                                    let updateAt = item.updateAt
                                    delete item.createdAt;
                                    delete item.updateAt;
                                    item.faculty = facultyAsSchool
                                    item.createdAt = createdAt
                                    item.updateAt = updateAt
                                    return item
                                })

                                index.sendReturn(res, 201, { error: false, message: "L'ecole a bien été créé avec succès", school: results[0] })

                            }
                        });
                    }
                });
            }
        }
    }
}


exports.userFacultyRegister = async(req, res) => {
    const data = req.body;
    let error = false
    if (index.exist(data.userId) == false)
        error = true;
    if (index.exist(data.facultyId) == false)
        error = true;
    if (error == true)
        index.sendReturn(res, 403, { error: true, message: "L'une ou plusieurs données obligatoire sont manquantes" })
    else {
        if (data.userId.match(/^[0-9]*$/gm) == null || data.facultyId.match(/^[0-9]*$/gm) == null) {
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
        }
        if (await index.userIdExist(data.userId) || await index.facultyIdExist(data.facultyId)) {
            index.sendReturn(res, 403, { error: true, message: "L'un des paramètre n'est pas correct" })
        }
        //Recuperation du type du user
        bdd.query("SELECT * FROM users WHERE id = '" + data.userId + "'", (error, results) => {
            if (error) {
                index.sendReturn(res, 400, { error: true, message: "Erreur dans la requête" });
            }
            // Si le resultat n'existe pas
            else if (results === undefined)
                index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
            // Si la liste des utilises est vide
            else if (results.length == 0) {
                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
            } else {
                user_type = results[0].type
                    //Recuperation du nombre max d'utilisateurs
                bdd.query("SELECT * FROM faculty WHERE id = '" + data.facultyId + "'", (error, results) => {
                    if (error) {
                        index.sendReturn(res, 400, { error: true, message: "Erreur dans la requête" });
                    }
                    // Si le resultat n'existe pas
                    else if (results === undefined)
                        index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
                    // Si la liste des utilises est vide
                    else if (results.length == 0) {
                        index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
                    } else {
                        nb_max = results[0].nb_studient
                            // Recuperation des id utilisateurs inscrits à la formation
                        bdd.query("SELECT Users_id FROM users_has_faculty WHERE Faculty_id = '" + data.facultyId.trim() + "'", (error, results) => {
                            if (error) {
                                index.sendReturn(res, 400, { error: true, message: "Erreur dans la requête" });
                            }
                            // Si le resultat n'existe pas
                            else if (results === undefined) {
                                index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
                            } else {
                                let request = ""
                                if (results.length != 0) {
                                    request = " WHERE ("
                                    for (i = 0; i < results.length; i++) {
                                        if (i == results.length - 1)
                                            request += "id = '" + results[i].Users_id + "') AND type = 'studiant'"
                                        else
                                            request += "id = '" + results[i].Users_id + "' OR "
                                    }
                                    // Recuperation des utilisateurs inscrits pour cette formation par leur id
                                    bdd.query("SELECT * FROM users" + request, (error, results) => {
                                        if (error) {
                                            index.sendReturn(res, 400, { error: true, message: "Erreur dans la requête" });
                                        }
                                        // Si le resultat n'existe pas
                                        else if (results === undefined)
                                            index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" })
                                        if (results.length >= nb_max && user_type == "Studiant") {
                                            index.sendReturn(res, 400, { error: true, message: "Le nombre d'etudiant maximum est atteints" })
                                        } else {
                                            // Vérification de si l'étudiant à déjà une formation
                                            bdd.query("SELECT * FROM users_has_faculty WHERE Users_id = '" + data.userId.trim() + "'", (error, results) => {
                                                if (error) {
                                                    index.sendReturn(res, 400, { error: true, message: "Erreur dans la requête" });
                                                }
                                                // Si le resultat n'existe pas
                                                else if (results === undefined)
                                                    index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
                                                //Si l'étudiant à déjà une formation
                                                if (results.length > 0 && user_type == "Studiant") {
                                                    index.sendReturn(res, 400, { error: true, message: "L'étudiant possède déjà une formation" })
                                                } else {
                                                    // Si toutes les conditions sont respecté, insertion en BDD
                                                    toInsert = {
                                                        Users_id: data.userId.trim(),
                                                        Faculty_id: data.facultyId.trim(),
                                                    };
                                                    bdd.query("INSERT INTO users_has_faculty SET ?", toInsert, (error, results) => {
                                                        if (error) {
                                                            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
                                                        }
                                                        // Si le resultat n'existe pas
                                                        else if (results === undefined)
                                                            index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
                                                        else {
                                                            index.sendReturn(res, 201, { error: false, message: "L'utilisateur a bien été ajouté avec succès" })
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    // Si toutes les conditions sont respecté, insertion en BDD
                                    toInsert = {
                                        Users_id: data.userId.trim(),
                                        Faculty_id: data.facultyId.trim(),
                                    };
                                    bdd.query("INSERT INTO users_has_faculty SET ?", toInsert, (error, results) => {
                                        if (error) {
                                            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
                                        }
                                        // Si le resultat n'existe pas
                                        else if (results === undefined)
                                            index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
                                        else {
                                            index.sendReturn(res, 201, { error: false, message: "L'utilisateur a bien été ajouté avec succès" })
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }
}


exports.updateFaculty = async(req, res) => {
    index.verifId(req.params.id, res)
    const data = req.body;
    if (data.name == undefined && data.nbStudient == undefined && data.diploma == undefined && data.nbYear == undefined)
        index.sendReturn(res, 401, { error: true, message: "Aucun données n'a été envoyée" })
    if (data.name != undefined) {
        if (index.textFormat(data.name) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.nbStudient != undefined) {
        if (isNaN(data.nbStudient))
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.diploma != undefined) {
        if ((data.diploma != 1 && data.diploma != 0))
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.nbYear != undefined) {
        if (isNaN(data.nbYear))
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    // Vérification de si le nom de la faculté existe déjà
    if (data.name != undefined && await index.nameExistF(data.name)) {
        index.sendReturn(res, 422, { error: true, message: "Le name déjà utilisé" })

    } else {
        // Si tout est ok Modification en base de donnée
        toUpdate = {}
        if (index.exist(data.name))
            toUpdate.name = data.name
        if (index.exist(data.diploma))
            toUpdate.diploma = data.diploma
        if (index.exist(data.nbStudient))
            toUpdate.nb_studient = data.nbStudient
        if (index.exist(data.nbYear))
            toUpdate.nb_year = data.nbYear
            // modification de la date d'update
        toUpdate.updateAt = new Date()
        bdd.query("UPDATE `faculty` SET ? WHERE `faculty`.`id` = '" + req.params.id + "'", toUpdate, (error, results) => {
            if (results.affectedRows != 0) {
                index.sendReturn(res, 200, { error: false, message: "La filière a été modifiée avec succès" })
            } else if (results.affectedRows == 0) {
                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
            } else {
                index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
            }
        })
    }
}

exports.getUserFaculty = async(req, res) => {
    index.verifId(req.params.id, res)
    if (await index.facultyIdExist(req.params.id))
        index.sendReturn(res, 422, { error: true, message: "L'id envoyez n'existe pas" })
    else {
        bdd.query(" SELECT * FROM faculty WHERE id ='" + req.params.id + "'; SELECT `users_has_faculty`.*, `users`.* FROM `users_has_faculty` LEFT JOIN `users` ON `users_has_faculty`.`Users_id` = `users`.`id` WHERE `users_has_faculty`.`Faculty_id`='" + req.params.id + "'", function(error, results, fields) {
            if (error) {
                index.sendReturn(res, 200, { error: true, message: "Erreur dans la requête" });
            }
            // Si le resultat n'existe pas
            else if (results === undefined)
                index.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
            // Si la liste des utilises est vide
            else if (results.length == 0)
                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
            else {
                results[0].map(item => {
                    delete item.School_id
                    delete item.createdAt
                    delete item.updateAt
                    let studients = []
                    let intervenants = []
                    for (i = 0; i < results[1].length; i++) {
                        results[1][i]["date-naissance"] = index.changeDateForSend(JSON.stringify(results[1][i]["date-naissance"]))
                        delete results[1][i].Users_id
                        delete results[1][i].Faculty_id
                        delete results[1][i].id
                        delete results[1][i].password
                        delete results[1][i].createdAt
                        delete results[1][i].updateAt
                        delete results[1][i].lastLogin
                        delete results[1][i].attempt
                        if (results[1][i].type == "Studiant") {
                            delete results[1][i].type
                            studients.push(results[1][i])
                        } else {
                            delete results[1][i].type
                            intervenants.push(results[1][i])
                        }
                    }
                    item.studients = studients
                    item.intervenants = intervenants
                    return item
                })

                index.sendReturn(res, 200, { error: false, faculty: results[0][0] })

            }
        });
    }
};