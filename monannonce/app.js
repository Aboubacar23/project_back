const express = require('express');
const initRoutes = require('./routes');
const initModels = require('./modeles');

const app = express();
require('dotenv').config()
app.get('/', (req, res) => {
    res.send('Home page');
})

app.use(express.json());
initRoutes(app)
const sequelize = initModels()

app.listen(3000, () => {
    console.log('serveur lancer ....');
})
