const express = require('express'),
    index = require('../index'),
    bdd = require('./modele/index'),
    bcrypt = require('bcrypt')


exports.getUsers = (req, res) => {
    // Récupération de tous les utilisateurs
    index.getUsers(res)
}

exports.getUser = (req, res) => {
    index.verifId(req.params.id, res);
    // Récupération d'un utilisateur unique
    index.getUsers(res, " WHERE id = '" + req.params.id + "'")
}

exports.getUserByType = (req, res) => {
    index.verifType(req.query.type, res);
    // Récupération d'es utilisateurs par leur type
    index.getUsers(res, " WHERE type = '" + req.query.type + "'")
}

exports.updateUser = async(req, res) => {
    index.verifId(req.params.id, res)
    const data = req.body;
    if (data.firstname == undefined && data.lastname == undefined && data.date_naissance == undefined && data.email == undefined && data.password == undefined && data.sexe == undefined && data.type == undefined)
        index.sendReturn(res, 401, { error: true, message: "Aucun données n'a été envoyée" })
        // Vérification du format de la date, de l'email et du sexe
    if (data.date_naissance != undefined) {
        if (index.dateFormat(data.date_naissance) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.email != undefined) {
        if (index.emailFormat(data.email) == false)
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    if (data.sexe != undefined) {
        if ((data.sexe != "Homme" && data.sexe != "Femme"))
            index.sendReturn(res, 409, { error: true, message: "L'une des données obligatoire ne sont pas conformes" })
    }
    // Vérification de si l'email existe déjà
    if (data.email != undefined && await index.emailExist(data.email))
        index.sendReturn(res, 422, { error: true, message: "Votre email n'est pas correct" })
        //^^Message d'erreur requête verif email
    else {
        // Si tout est ok Modification en base de donnée
        toUpdate = {}
        if (index.exist(data.firstname))
            toUpdate.firstname = data.firstname
        if (index.exist(data.lastname))
            toUpdate.lastname = data.lastname
        if (index.exist(data.email))
            toUpdate.email = data.email
        if (index.exist(data.password)) {
            data.password = await new Promise(resolve => {
                bcrypt.genSalt(10, async(err, salt) => {
                    return await bcrypt.hash(data.password, salt, (err, hash) => {
                        resolve(hash)
                    });
                });
            })
            toUpdate.password = data.password
        }
        if (index.exist(data.date_naissance))
            toUpdate["date-naissance"] = index.changeDateForSQL(data.date_naissance)
        if (index.exist(data.sexe))
            toUpdate.sexe = data.sexe
        if (index.exist(data.type))
            toUpdate.type = data.type
            // modification de la date d'update
        toUpdate.updateAt = new Date()
        bdd.query("UPDATE `users` SET ? WHERE `users`.`id` = '" + req.params.id + "'", toUpdate, (error, results) => {
            if (results.affectedRows != 0) {
                index.sendReturn(res, 200, { error: false, message: "L'utilisateur a été modifiée avec succès" })
            } else if (results.affectedRows == 0) {
                index.sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
            } else {
                index.sendReturn(res, 400, { error: true, message: "Modification Impossible" })
            }
        })
    }
}


exports.deleteUser = (req, res) => {
    index.verifId(req.params.id, res)
        // Suppression de l'utilisateur en base de donnée
    bdd.query("DELETE FROM `users` WHERE `users`.`id` = '" + req.params.id + "'", (error, results) => {
        if (results.affectedRows != 0) {
            index.sendReturn(res, 200, { error: false, message: "L'utilisateur a été déconnecté avec succès" })
        } else if (results.length == undefined) {
            index.sendReturn(res, 409, { error: true, message: "L'id envoyé n'existe pas" })
        } else {
            index.sendReturn(res, 400, { error: true, message: "Erreur lors de la suppression de l' utilisateur" })
        }
    })
}

// Function pour passer à l'heure d'Hiver
Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
}