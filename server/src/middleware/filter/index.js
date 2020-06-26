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

//Function vérification password
exports.passwordFormat = (data) => {
    let regexPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/
    return data.match(regexPassword) == null || data === undefined ? false : true
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
exports.numberFormat = (data) => {
    let regexNumber = /^[0-9]+$/
    if (data.match(regexNumber) == null)
        return false
    else
        return true
}

exports.floatFormat = (data) => {
    let regexFloat = /^[0-9]+(\.[0-9]{0,})$/
    if (data.match(regexFloat) == null)
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
};

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

//Function qui recupere l'utilisateur courant
exports.getUser = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT * FROM utilisateur" + where, (error, results, fields) => {
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
            sendReturn(res, 409, { error: true, message: "Aucun résultat" })
        else {
            if (results.length > 0) {
                results.map(item => {
                    //delete item.id; // Suppression d'un elements
                    item.date_naissance = changeDateForSend(JSON.stringify(item.date_naissance));
                    delete item.password;
                    delete item.createdAt;
                    delete item.updateAt;
                    delete item.lastLogin;
                    delete item.attempt;
                    return item; // Retour le nouvel element item => results[i] = item
                })
                sendReturn(res, port, {
                    error: false,
                    user: results[0]
                })
            } else {
                sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}

// Function qui récupère tous les users de l'entreprise dans la table utilisateurs
exports.getUsersByEntreprise = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT utilisateur.*,entreprise.nom FROM `entreprise` LEFT JOIN `utilisateur` ON `utilisateur`.`id_entreprise` = `entreprise`.`id`" + where, (error, results, fields) => {
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
            sendReturn(res, 200, { error: false, message: "Résultat vide" })
        else {
            if (results.length > 0) {
                results.map(item => {
                    // Array.map => Foreach()
                    //delete item.id; // Suppression d'un elements
                    item.date_naissance = changeDateForSend(JSON.stringify(item.date_naissance))
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
            } else {
                sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}

// Function qui récupère tous les clients de l'entreprise dans la table clients
exports.getClientsByEntreprise = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT `clients`.*,`entreprise`.nom,`entreprise`.email_entreprise,`entreprise`.telephone FROM `clients` LEFT JOIN `entreprise` ON `clients`.`id_entreprise_client` = `entreprise`.`id`" + where, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            sendReturn(res, port, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            sendReturn(res, port, { error: false, message: "Aucun résultat pour la requête" });
        else {
            if (results.length >= 0) {
                results.map(item => {
                    //delete item.id; // Suppression d'un elements
                    //delete item.id_entreprise_client; // Suppression d'un elements
                    //delete item.id_entreprise_utilisateur; // Suppression d'un elements
                    item.date_naissance = changeDateForSend(JSON.stringify(item.date_naissance))
                    return item; // Retour le nouvel element item => results[i] = item
                });
                //console.log(JSON.stringify(results));
                sendReturn(res, port, {
                    error: false,
                    clients: results
                })
            } else {
                sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}

// Function qui récupère tous les factures de l'entreprise dans la table factures
exports.getFacturesByEntreprise = (res, where = "", port = 200, messageSend = "") => {
        bdd.query("SELECT `facture`.*, `clients`.* FROM `facture` LEFT JOIN `clients` ON `facture`.`id_client` = `clients`.`id`" + where, (error, results, fields) => {
            // Si erreur dans la requête
            if (error) {
                console.log(error)
                sendReturn(res, port, { error: false, message: "Erreur dans la requête" });
            }
            // Si le resultat n'existe pas
            else if (results === undefined)
                sendReturn(res, port, { error: false, message: "Aucun résultat pour la requête" });
            else {
                if (results.length >= 0) {
                    results.map(item => {
                        //delete item.id; // Suppression d'un elements
                        //delete item.id_entreprise_client; // Suppression d'un elements
                        //delete item.id_entreprise_utilisateur; // Suppression d'un elements
                        item.date = changeDateForSend(JSON.stringify(item.date))
                        item.date_naissance = changeDateForSend(JSON.stringify(item.date_naissance))
                        return item; // Retour le nouvel element item => results[i] = item
                    });
                    //console.log(JSON.stringify(results));
                    sendReturn(res, port, {
                        error: false,
                        factures: results
                    })
                } else {
                    sendReturn(res, 401, {
                        error: true,
                        message: "La requête en base de donnée n'a pas fonctionné"
                    })
                }
            }
        });
    }
    // Function qui récupère tous les projets de l'entreprise dans la table projets
exports.getProjetsByEntreprise = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT `projet`.*, `utilisateur`.`firstname`, `utilisateur`.`lastname` FROM `projet` LEFT JOIN `utilisateur` ON `projet`.`id_user` = `utilisateur`.`id`" + where, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            sendReturn(res, port, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            sendReturn(res, port, { error: false, message: "Aucun résultat pour la requête" });
        else {
            if (results.length >= 0) {
                results.map(item => {
                    item.date_debut = changeDateForSend(JSON.stringify(item.date_debut))
                    item.date_fin = changeDateForSend(JSON.stringify(item.date_fin))
                    return item; // Retour le nouvel element item => results[i] = item
                });
                //console.log(JSON.stringify(results));
                sendReturn(res, port, {
                    error: false,
                    projets: results
                })
            } else {
                sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}

// Function qui récupère tous les tickets de l'entreprise dans la table ticket
exports.getTicketsByEntreprise = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT `ticket`.*, `utilisateur`.`firstname`, `utilisateur`.`lastname` FROM `ticket` LEFT JOIN `utilisateur` ON `ticket`.`id_user` = `utilisateur`.`id`" + where, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            sendReturn(res, port, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            sendReturn(res, port, { error: false, message: "Aucun résultat pour la requête" });
        else {
            if (results.length >= 0) {
                results.map(item => {
                    item.dateTicket = changeDateForSend(JSON.stringify(item.dateTicket))
                    return item; // Retour le nouvel element item => results[i] = item
                });
                //console.log(JSON.stringify(results));
                sendReturn(res, port, {
                    error: false,
                    tickets: results
                })
            } else {
                sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}


// Function qui récupère tous les tickets de l'entreprise dans la table ticket
exports.getEvenementsByEntreprise = (res, where = "", port = 200, messageSend = "") => {
    bdd.query("SELECT `calendrier`.*, `utilisateur`.`firstname`, `utilisateur`.`lastname` FROM `calendrier` LEFT JOIN `utilisateur` ON `calendrier`.`id_user` = `utilisateur`.`id`" + where, (error, results, fields) => {
        // Si erreur dans la requête
        if (error) {
            console.log(error)
            sendReturn(res, port, { error: false, message: "Erreur dans la requête" });
        }
        // Si le resultat n'existe pas
        else if (results === undefined)
            sendReturn(res, port, { error: false, message: "Aucun résultat pour la requête" });
        else {
            if (results.length >= 0) {
                results.map(item => {
                    item.start = JSON.stringify(item.start).substr(1, 10)
                    item.end = JSON.stringify(item.end).substr(1, 10)
                    return item; // Retour le nouvel element item => results[i] = item
                });
                //console.log(JSON.stringify(results));
                sendReturn(res, port, {
                    error: false,
                    evenements: results
                })
            } else {
                sendReturn(res, 401, {
                    error: true,
                    message: "La requête en base de donnée n'a pas fonctionné"
                })
            }
        }
    });
}