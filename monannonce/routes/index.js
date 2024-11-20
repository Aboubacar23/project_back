const annonceRoutes = require('./annonce')
const userRouter = require('./user')
const signalementRouter = require('./routes/signalement')
const commentaireRouter = require('./routes/commentaire')
const categorieRouter = require('./routes/categorie')

function initRoutes(app) {
    //la liste classe routes
    app.use('/api/annonces', annonceRoutes);
    app.use('/api/users',userRouter);
    app.use('/api/categories',categorieRouter);
    app.use('/api/signalements',signalementRouter);
    app.use('/api/commentaires',commentaireRouter);

}


module.exports = initRoutes