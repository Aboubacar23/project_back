const mongoose = require('mongoose');


const signalementSchema = new mongoose.Schema({
    annonce: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Annonce', 
        required: true 
    }, 
    utilisateur: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    }, 
    email_utilisateur: { 
        type: String, 
        required: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validation de l'email
    },
    message: { 
        type: String, 
        required: true 
    }, 
    date_signalement: { 
        type: Date, 
        default: Date.now 
    }, 
});


module.exports = mongoose.model('Signalement', signalementSchema);
