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

router.get('/lists', async (req, res) => {
     try {
         const users = await User.findAll({attributes : ['id', 'nom', 'prenom', 'email', 'password']});

         return res.status(200).json({
             status: 'Success',
             users,
         });
     }catch (err)
     {
         console.log('ERROR', err);
         return  res.status(400).json({
             status: 'err',
             details: err.errors || err.message,
         })

     }
})

router.put('/edit/:id', validatorUser, async (req, res, next) => {
  const userId = req.params.id; // Récupération de l'id depuis les paramètres de la requête
  const {nom, prenom, email, password} = req.body;
  const transaction = await sequelize.transaction();
  const hashePassword = await  bcrypt.hash(password, 8);

    try {
      const user = await User.findByPk(userId);
      if (!user)
      {
          return res.status(404).json({
              status: 'error',
              message: `User avec ID ${userId} introuvable`,
          });
      }

    await user.update({nom, prenom, email, password:hashePassword}, {transaction});
    transaction.commit();

    return res.status(200).json({
        status: 'success',
        message: `Utilisateur avec l'ID ${userId} modifié avec succès`,
        user: {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            password: user.password
        },
    })
  }catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
});

router.delete('/delete/:id', async  (req, res) => {
    const userId = req.params.id; // ID de l'utilisateur à supprimer

    try {
        // Rechercher l'utilisateur
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Utilisateur avec l'ID ${userId} introuvable`,
            });
        }

        // Supprimer l'utilisateur
        await user.destroy();

        return res.status(200).json({
            status: 'success',
            message: `Utilisateur avec l'ID ${userId} supprimé avec succès`,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
})

router.get('/show/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId, {
            attributes : ['id', 'nom', 'prenom', 'email', 'password']
        });

        if (!user)
        {
            return res.status(404).json({
                status: 'error',
                message: `User avec ID ${userId} introuvable`,
            });
        }

        return res.status(200).json({
            status: 'success',
            user,
        });
    }catch (err){
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message
        });
    }
});

module.exports = router;
