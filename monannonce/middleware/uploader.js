const multer = require('multer');
const path = require('path');


//définir l'emplacement et du nom des fichiers télécharger
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'assets/uploads/'); //chemin du fichier
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 150);
        cb(null, uniqueSuffix + path.extname(file.originalname)); //généré une nom unique
    }
});


//filtre les fichies pour accepté que l'image
const fileFilter = (req, file, cb) => {
    console.log('Je suis ici');
    if (file.mimetype.startsWith('image/')){
        cb(null, true);
    }else {
        cb(new Error('Seuls les fichiers images sont autotisés !'), false);
    }
};


const uploader = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter
});


module.exports = uploader;
