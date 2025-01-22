const express = require("express");
const router = express.Router();
const commentaireController = require("../controllers/commentaireController");

router.get("/list", commentaireController.listCommentaires);
router.post("/new", commentaireController.createCommentaire);
router.get("/show/:id", commentaireController.showCommentaire);
router.put("/edit/:id", commentaireController.editCommentaire);
router.delete("/delete/:id", commentaireController.deleteCommentaire);

module.exports = router;
