const express = require('express')
const app = express()
const initRoutes = require('./routes')

app.get('/', (req, res) => {
    res.send('Home page');
})

app.use(express.json());

initRoutes(app)

app.listen(3000, () => {
    console.log('serveur lancer ....');
})