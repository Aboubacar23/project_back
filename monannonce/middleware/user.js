const {checkSchema} = require('express-validator');

async function validatorUser(req, res, next) {

    console.log('user validator');
    const [result] = await checkSchema({
        nom: {
            notEmpty : true
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

/**
 * const { checkSchema, validationResult } = require('express-validator');
 *
 * async function validatorUser(req, res, next) {
 *     console.log('user validator');
 *
 *     // Exécute les validations basées sur le schéma
 *     await checkSchema({
 *         nom: {
 *             notEmpty: {
 *                 errorMessage: 'Le champ nom est requis',
 *             },
 *         },
 *     }).run(req);
 *
 *     // Récupère les résultats des validations
 *     const errors = validationResult(req);
 *     console.log('Req Body ..............')
 *     console.log(req.body);
 *
 *     if (!errors.isEmpty())
 *     {
 *         return res.status(400).json({
 *             statut: 'échec',
 *             erreurs: errors.array(),
 *         });
 *     }
 *
 *     next();
 * }
 *
 * module.exports = {
 *     validatorUser,
 * };
 */