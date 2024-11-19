const express = require('express')
const app = express()
const annonceRoutes = require('./routes/annonce')
const userRouter = require('./routes/user')
const signalementRouter = require('./routes/signalement')
const commentaireRouter = require('./routes/commentaire')
const categorieRouter = require('./routes/categorie')


app.get('/', (req, res) => {
    res.send('Home page');
})

app.use(express.json());

//la liste classe routes
app.use('/api/annonces', annonceRoutes);
//app.use('/api/users',userRouter);
//app.use('/api/categories',categorieRouter);
//app.use('/api/signalements',signalementRouter);
//app.use('/api/commentaires',commentaireRouter);


app.listen(3000, () => {
    console.log('serveur lancer ....');
})