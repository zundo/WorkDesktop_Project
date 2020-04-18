const bdd = require('../../modele/index_old');

/**
 * Function qui fait un retour d'une donnée
 * @param {Response} res 
 * @param {Number} status 
 * @param {Object} data 
 */

const sendReturn = (res, status = 500, data = { error: true, message: "Processing error" }) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        res.status(status).json(data)
    } catch (error) {
        let sendError = { error: true, message: "Processing error" }
        res.status(500).json(sendError)
    }
}
exports.sendReturn = (res, status = 500, data = { error: true, message: "Processing error" }) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        res.status(status).json(data)
    } catch (error) {
        let sendError = { error: true, message: "Processing error" }
        res.status(500).json(sendError)
    }
}



// Function qui vérifie l'existence d'une data
exports.exist = (data) => {
    if (data == undefined || data.trim().length == 0)
        return false
    else
        return true

}

// Function vérification de si la date est dans le bon format à l'envoi
exports.dateFormat = (data) => {
    let regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    if (data.match(regexDate) == null)
        return false
    else
        return true
}

// Function vérification de si l'email est dans le bon format
exports.emailFormat = (data) => {
    let regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (data.match(regexEmail) == null)
        return false
    else
        return true
}


// Function vérification de si le zip est dans le bon format
exports.zipFormat = (data) => {
    let regexZip = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/
    if (data.match(regexZip) == null)
        return false
    else
        return true
}

// Function vérification de si le text est dans le bon format
exports.textFormat = (data) => {
    let regexText = /^[^@&"()!_$*€£`+=\/;?#]+$/
    if (data.match(regexText) == null)
        return false
    else
        return true
}

// Function vérification de si l'email existe en base de données
exports.emailExist = async(data) => {
    let toReturn = false
    toReturn = await new Promise(resolve => {
        bdd.query("SELECT * FROM `users` WHERE `email` LIKE '" + data.trim().toLowerCase() + "'", (error, results) => {
            resolve((results.length > 0) ? true : false)
        })
    })
    return toReturn
}

// Function vérification de si le nom existe en base de données
exports.nameExistS = async(data) => {
    let toReturn = false
    toReturn = await new Promise(resolve => {
        bdd.query("SELECT * FROM `school` WHERE `name` LIKE '" + data.trim().toLowerCase() + "'", (error, results) => {
            resolve((results.length > 0) ? true : false)
        })
    })
    return toReturn
}

// Function vérification de si le nomfaculty existe en base de données
exports.nameExistF = async(data) => {
    let toReturn = false
    toReturn = await new Promise(resolve => {
        bdd.query("SELECT * FROM `faculty` WHERE `name` LIKE '" + data.trim().toLowerCase() + "'", (error, results) => {
            resolve((results.length > 0) ? true : false)
        })
    })
    return toReturn
}

// Function qui change le format de la date pour l'insertion en base de donnée
exports.changeDateForSQL = (data) => {
    data = data.substr(6, 4) + "-" + data.substr(3, 2) + "-" + data.substr(0, 2) + " 12:00:00";
    return data
}

// Function qui change le format de la date pour le renvoi de la requête
exports.changeDateForSend = (data) => {
    data = data.substr(9, 2) + "-" + data.substr(6, 2) + "-" + data.substr(1, 4);
    return data
}

const changeDateForSend = (data) => {
    data = data.substr(9, 2) + "-" + data.substr(6, 2) + "-" + data.substr(1, 4);
    return data
}

// Function qui vérifie si l'id existe et si il est conforme
exports.verifId = (data, res) => {
    if (data === undefined)
        this.sendReturn(res, 403, { error: true, message: "Veuillez insérer un id" })
    else if (data.match(/^[0-9]*$/gm) == null)
        this.sendReturn(res, 400, { error: true, message: "L'id envoyé n'est pas conforme" })
}

// Function vérification de si userid est bien present dans la BDD ou pas
exports.userIdExist = async(data) => {
    let toReturn = false
    toReturn = await new Promise(resolve => {
        bdd.query("SELECT * FROM users WHERE id LIKE '" + data.trim() + "'", (error, results) => {
            resolve((results.length > 0) ? false : true)
        })
    })
    return toReturn
}

// Function vérification de si idfaculty est bien present dans la BDD ou pas
exports.facultyIdExist = async(data) => {
    let toReturn = false
    toReturn = await new Promise(resolve => {
        bdd.query("SELECT * FROM faculty WHERE id LIKE '" + data.trim() + "'", (error, results) => {
            resolve((results.length > 0) ? false : true)
        })
    })
    return toReturn
}

// Function qui vérifie si l'id existe et si il est conforme
exports.verifType = (data, res) => {
    if (data.match(/^[^@&"()!_$*€£`+=\/;?#]+$/) == null)
        this.sendReturn(res, 400, { error: true, message: "Le type envoyé n'est pas conforme" })
    else if (data != "Studiant" && data != "Intervenant")
        this.sendReturn(res, 403, { error: true, message: "Le type envoyé n'existe pas" })
}

// Function qui récupère tous les utilisateurs dans la table users
exports.getUsers = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT * FROM users" + where, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            sendReturn(res, port, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            sendReturn(res, port, { error: false, message: "Aucun résultat pour la requête" });
        // Si la liste des utilises est vide
        else if (results.length == 0)
            sendReturn(res, 409, { error: true, message: "L'id envoyez n'existe pas" })
        else {
            if (results.length > 1) {
                results.map(item => {
                    // Array.map => Foreach()
                    delete item.id; // Suppression d'un elements
                    item["date-naissance"] = changeDateForSend(JSON.stringify(item["date-naissance"]))
                    delete item.password;
                    delete item.createdAt;
                    delete item.updateAt;
                    delete item.lastLogin;
                    delete item.attempt;
                    return item; // Retour le nouvel element item => results[i] = item
                })
                sendReturn(res, port, {
                    error: false,
                    users: results
                })
            }
            // Si la récuperation est bonne
            if (messageSend != "") {
                results.map(item => {
                    // Array.map => Foreach()
                    delete item.id; // Suppression d'un elements
                    item["date-naissance"] = changeDateForSend(JSON.stringify(item["date-naissance"]))
                    delete item.password;
                    delete item.lastLogin;
                    delete item.attempt;

                    return item; // Retour le nouvel element item => results[i] = item
                })
                sendReturn(res, port, {
                    error: false,
                    message: messageSend,
                    user: results[0]
                })
            }
            if (where == "") {
                results.map(item => {
                    // Array.map => Foreach()
                    item["date-naissance"] = changeDateForSend(JSON.stringify(item["date-naissance"]))
                    delete item.password; // Suppression d'un elements
                    delete item.createdAt;
                    delete item.updateAt;
                    delete item.lastLogin;
                    delete item.attempt;
                    return item; // Retour le nouvel element item => results[i] = item
                })
                sendReturn(res, port, {
                    error: false,
                    users: results
                })
            } else {
                results.map(item => {
                    // Array.map => Foreach()
                    item["date-naissance"] = changeDateForSend(JSON.stringify(item["date-naissance"]))
                    delete item.id; // Suppression d'un elements
                    delete item.password;
                    delete item.lastLogin;
                    delete item.attempt;

                    return item; // Retour le nouvel element item => results[i] = item
                })
                sendReturn(res, port, {
                    error: false,
                    user: results[0]
                })
            }
        }
    });
}