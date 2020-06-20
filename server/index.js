const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    /*---------------------------------------------------------- */
    registerCtrl = require('./src/Controllers/register'),
    loginCtrl = require('./src/Controllers/login'),
    collaborateurCtrl = require("./src/Controllers/collaborateur"),
    userCtrl = require("./src/Controllers/user"),
    clientCtrl = require("./src/Controllers/client"),
    factureCtrl = require("./src/Controllers/facture"),
    /*---------------------------------------------------------- */
    app = express(),
    port = 3000;

// parse application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.setHeader('Content-Type', 'application/json')
    next();
});

app.use(express.static('public'));

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError')
        res.status(401).send('Missing authentication credentials.');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

/*------------------------------------------------------------- */
/*app.get('/testApi/:siret', (req, res) => {
    //console.log(req.params.siret);

    axios.get('https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/' + req.params.siret)
        .then(function(response) {
            console.log(response.data);
            res.setHeader('Content-Type', 'application/json')
            try {
                res.status(200).json({ data_entreprise: response.data })
            } catch (error) {
                let sendError = { error: true, message: "Processing error" }
                res.status(500).json(sendError)
            }
        })
        .catch(function(error) { console.log(error); })
});*/

app.post('/register', registerCtrl.register); //Inscription Utilisateur ADMIN
app.post('/login', loginCtrl.login); //Login

app.get('/user/:id', userCtrl.getUtilisateur); //recuperation l'utilisateur unique (user connecte)
app.put('/user/:id', userCtrl.updateUtilisateur) // Update de l'utilisateur
app.put('/userEditPass/:id', userCtrl.editPasswordUtilisateur) // modifier le mdp de l'utilisateur

app.get('/users/:id', userCtrl.getUsersByEnt); //recuperation les users(collaborateurs) de l'entreprise
app.post('/addCollaborateur', collaborateurCtrl.addCollaborateur); //Inscription collaborateurs
app.delete('/deleteCollaborateur/:id', collaborateurCtrl.deleteCollaborateur); //Supprimer le collaborateur

app.get('/clients/:id', clientCtrl.getClientsByEnt); //recuperation des clients de l'entreprise
app.post('/addClient', clientCtrl.addClient); //Inscription client
app.delete('/deleteClient/:id', clientCtrl.deleteClient); //Supprimer le client
app.put('/updateClient/:id', clientCtrl.updateClient); // Update du client

app.get('/factures/:id', factureCtrl.getFacturesByEnt); //recuperation des factures de l'entreprise
app.post('/addFacture', factureCtrl.addFacture); //Inscription collaborateurs
app.delete('/deleteFacture/:id', factureCtrl.deleteFacture); //Supprimer la facture
app.put('/updateFacture/:id', factureCtrl.updateFacture); // update Fcature

/*------------------------------------------------------------- */
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname + '/error.html'))
})

app.listen(port, () => console.log(`App listening on port ` + port))