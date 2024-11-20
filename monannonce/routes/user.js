const express = require('express');
const {validatorUser} = require("../middleware/user");
const router = express.Router();

router.post('/register', validatorUser, (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    statut: 'succès',
    message: 'Utilisateur créé avec succès',
  })
})

router.get('/list', (req, res) => {
  res.status(201).json({
    statut: 'succès',
    message: 'Utilisateurs',
  })
})

module.exports = router;