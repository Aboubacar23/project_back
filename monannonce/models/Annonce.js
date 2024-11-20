const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
    titre: { type: String, required: true, maxlength: 255 }, 
    description: { type: String, required: true }, 
    prix: { type: Number, required: true, min: 0 }, 
    statut: { 
        type: String, 
        enum: ['Visible', 'Non-visible'], 
        default: 'Visible' 
    }, 
    annonceur: {}, 
    categorie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categorie', 
        required: true 
    }, 
    date_publication: { 
        type: Date, 
        default: Date.now 
    }, 
});


module.exports = mongoose.model('Annonce', annonceSchema);
