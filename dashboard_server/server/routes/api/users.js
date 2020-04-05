const express = require('express');
const mongodb = require('mongodb');
const config = require('../../../config/DB');
const router = express.Router();

// Get users
router.get('/', async(req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({}).toArray());
});

// Add user
router.post('/Add', async(req, res) => {
    const posts = await loadUsersCollection();
    console.log(posts)
    const data = Object.assign({ email: '', password: '', username: '' }, req.body)

    /*if (!filter.email(data.email) || data.password < 2 || data.username < 2)
        return res.status(400).json({
            error: true,
            message: 'Syntaxe request error'
        })*/

    await posts.insertOne({
        email: data.email,
        password: data.password,
        username: data.username,
        sexe: 'Homme',
        avatar: '',
        active: true,
        __v: 0
    });
    res.status(201).send();
});


async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(
        config.DB, {
            useNewUrlParser: true
        }
    );
    return client.db('canalciel').collection('users');
}

module.exports = router;