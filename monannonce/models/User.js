const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nom : {type : String, required : true },
    prenom : {type : String, required : true},
    password: { type: String, required: true },
    roles: { type: String, enum: ['admin', 'annonceur', 'acheteur'], required: true },
    date_creation: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);