mysql = require('mysql'),
    bdd = mysql.createConnection({
        multipleStatements: true,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dashboard_inglorius',
        port: '3308'
    })

bdd.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected');
})

module.exports = bdd;