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

router.post('/login', validatorUser, (req, res) => {
  res.status(201).json({
    statut: 'succès',
    message: 'Utilisateurs',
  })
})

router.get('/list', (req, res) => {
  res.status(201).json({
    statut: 'succès',
    message: 'Utilisateurs',
  })
})

router.put('/edit/:id', validatorUser, (req, res, next) => {
  console.log(req.body);
  const userId = req.params.id; // Récupération de l'id depuis les paramètres de la requête

  res.status(201).json({
    statut: 'succès',
    message: `Utilisateur avec l'ID ${userId} modifié avec succès`,
  })
})

router.delete('/delete/:id', (request, response) => {
  response.send("suppression de l'user");
})

module.exports = router;