const bdd = require('../../modele/index');

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
        bdd.query("SELECT * FROM `utilisateur` WHERE `email` LIKE '" + data.trim().toLowerCase() + "'", (error, results) => {
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