const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    registerCtrl_old = require('./src/Controllers_old/register'),
    schoolCtrl_old = require('./src/Controllers_old/school'),
    facultyCtrl_old = require('./src/Controllers_old/faculty'),
    userCtrl_old = require('./src/Controllers_old/user'),
    loginCtrl_old = require('./src/Controllers_old/login'),
    /*---------------------------------------------------------- */
    registerCtrl = require('./src/Controllers/register'),
    loginCtrl = require('./src/Controllers/login'),
    collaborateurCtrl = require("./src/Controllers/collaborateur"),
    userCtrl = require("./src/Controllers/user"),
    clientCtrl = require("./src/Controllers/client"),
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
app.post('/register', registerCtrl.register); //Inscription Utilisateur ADMIN
app.post('/login', loginCtrl.login); //Login

app.get('/user/:id', userCtrl.getUtilisateur); //recuperation l'utilisateur unique (user connecte)
app.put('/user/:id', userCtrl.updateUtilisateur) // Update de l'utilisateur
app.put('/userEditPass/:id', userCtrl.editPasswordUtilisateur) // modifier le mdp de l'utilisateur
app.get('/users/:id', userCtrl.getUsersByEnt); //recuperation les utilisateurs de l'entreprise

app.get('/clients/:id', clientCtrl.getClientsByEnt); //recuperation des clients de l'entreprise

app.post('/addCollaborateur', collaborateurCtrl.addCollaborateur); //Inscription collaborateurs
app.delete('/deleteCollaborateur/:id', collaborateurCtrl.deleteCollaborateur); //Supprimer le collaborateur
/*------------------------------------------------------------- */

app.post('/register_old', registerCtrl_old.register)

app.post('/login_old', loginCtrl_old.login)

app.get('/user', userCtrl_old.getUsers)

app.get('/user/:id', userCtrl_old.getUser)

app.get('/users', userCtrl_old.getUserByType)

app.put('/user/:id', userCtrl_old.updateUser)

app.delete('/user/:id', userCtrl_old.deleteUser)

app.post('/school/register', schoolCtrl_old.register)

app.get('/school', schoolCtrl_old.getSchools)

app.get('/school/:id', schoolCtrl_old.getSchool)

app.put('/school/:id', schoolCtrl_old.updateSchool)

app.post('/school/:id/faculty', facultyCtrl_old.register)

app.post('/faculty/user', facultyCtrl_old.userFacultyRegister)

app.put('/faculty/:id', facultyCtrl_old.updateFaculty)

app.get('/faculty/:id', facultyCtrl_old.getUserFaculty)

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname + '/error.html'))
})

app.listen(port, () => console.log(`App listening on port ` + port))