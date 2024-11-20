const { checkSchema, validationResult } = require('express-validator');

async function validatorCommentaire(req, res, next) {
    console.log('Commentaire validator');

    // Exécute les validations basées sur le schéma
    await checkSchema({
        id: {
            in: ['params'], 
            isInt: {
                errorMessage: 'L\'ID doit être un nombre entier',
            },
            optional: true, 
        },
        commentaire: {
            in: ['body'], 
            isString: {
                errorMessage: 'Le commentaire doit être une chaîne de caractères',
            },
            notEmpty: {
                errorMessage: 'Le commentaire ne peut pas être vide',
            },
            optional: {
                options: { nullable: true }, 
            },
        },
    }).run(req);

    // Récupère les résultats des validations
    const errors = validationResult(req);
    console.log('Req Body ..............');
    console.log(req.body);

    // Si des erreurs existent, les renvoyer dans la réponse
    if (!errors.isEmpty()) {
        return res.status(400).json({
            statut: 'échec',
            erreurs: errors.array(),
        });
    }

    // Passe au middleware ou à la route suivante
    next();
}

module.exports = {
    validatorCommentaire,
};
