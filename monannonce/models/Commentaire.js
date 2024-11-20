const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    annonce: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Annonce', 
        required: true 
    }, 
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    objet: { type: String, required: true, maxlength: 255 }, 
    description: { type: String, required: true }, 
    date_commentaire: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Commentaires', commentaireSchema);
