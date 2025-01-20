 const { checkSchema, validationResult } = require('express-validator');

 async function validatorUser(req, res, next) {
     console.log('user validator');

     // Exécute les validations basées sur le schéma
     await checkSchema({
         password: {
             notEmpty: {
                 errorMessage: 'Le champ password est requis',
             },
         },
         email: {
             notEmpty: {
                 errorMessage: 'Le champ email est requis',
             },
             isEmail: {
                 errorMessage: 'Le format de l\'email est invalide',
             },
         },
     }).run(req);

     // Récupère les résultats des validations
     const errors = validationResult(req);
     //console.log('Req Body ..............')
     //console.log(req.body);

     if (!errors.isEmpty())
     {
         return res.status(400).json({
             statut: 'échec',
             erreurs: errors.array(),
         });
     }

     next();
 }

 module.exports = {
     validatorUser,
 };


 /** const {checkSchema} = require('express-validator');

  async function validatorUser(req, res, next) {

  console.log('user validator');
  const [result] = await checkSchema({
  nom: {
  notEmpty : true
  },
  email: {
  notEmpty: true,
  isEmail: {
  errorMessage: 'Le format de l\'email est invalide',
  },
  },
  }).run(req);


  console.log(req.body);

  if (!result.isEmpty())
  {
  res.status(400).json('Pas de nom trouver');
  }

  next();
  }


  module.exports = {
  validatorUser
  }
  */

