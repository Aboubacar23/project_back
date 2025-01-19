const express = require('express');
const {validatorUser} = require("../middleware/user");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken'); // Pour créer et vérifier les tokens JWT
const { sequelize, User } = require('../models')


router.post('/register', validatorUser, async  (req, res, next) => {

  const transaction = await sequelize.transaction();

  try {
    const { nom, prenom,email,password } = req.body;
    const hashePassword = await bcrypt.hash(password,8);

    const user = await User.create({
      nom,prenom,email, password:hashePassword
    }, {transaction})

    transaction.commit();

      return res.status(201).json({
        status : "success",
        user: user
      })

  }catch(err) {
    transaction.rollback();
    console.log('ERROR', err);
    return res.status(400).json({
      status: "error",
      details: err.errors
    })
  }

})

router.post('/login', validatorUser, async (req, res) => {
  try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where : {email}});

      if (!user) return res.status(404).json({status : "Not found"});
        console.log('Mon mot de passe');
      console.log(user.password);
      console.log(password);

      const isPasswordValidated = await bcrypt.compare(password,user.password);
      console.log('Mon mot de passe decrypté');
      console.log(isPasswordValidated);

      console.log(isPasswordValidated);
      if(!isPasswordValidated) return res.status(401).json({ status: "Incorrect password" });

      const token = jwt.sign({id : user.email}, 'secret-key', {expiresIn: '1h'});

      return res.status(200).json({ token, user });
  }catch (err) {
    console.log('ERROR', err);
    return res.status(400).json({
      status: "error",
      details: err.errors
    })
  }
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
