const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Liste des utilisateurs
exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'nom', 'prenom', 'email', 'role'] });
        return res.status(200).json({
            status: 'success',
            users,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Création d'un utilisateur (register)
exports.createUser = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { nom, prenom, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create(
            { nom, prenom, email, password: hashedPassword, role },
            { transaction }
        );
        await transaction.commit();

        return res.status(201).json({
            status: 'success',
            user,
        });
    } catch (err) {
        await transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors,
        });
    }
};

// Connexion (login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ status: 'Not found' });

        const isPasswordValidated = await bcrypt.compare(password, user.password);
        if (!isPasswordValidated) return res.status(401).json({ status: 'Incorrect password' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret-key', { expiresIn: '1h' });

        return res.status(200).json({ token, user });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors,
        });
    }
};

// Modifier un utilisateur
exports.editUser = async (req, res) => {
    const userId = req.params.id;
    const transaction = await sequelize.transaction();
    try {
        const { nom, prenom, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User avec ID ${userId} introuvable`,
            });
        }

        await user.update({ nom, prenom, email, password: hashedPassword, role }, { transaction });
        await transaction.commit();

        return res.status(200).json({
            status: 'success',
            message: `Utilisateur avec l'ID ${userId} modifié avec succès`,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        await transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};

// Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `Utilisateur avec l'ID ${userId} introuvable`,
            });
        }

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
};

// Afficher un utilisateur spécifique
exports.showUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'nom', 'prenom', 'email', 'role'],
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User avec ID ${userId} introuvable`,
            });
        }

        return res.status(200).json({
            status: 'success',
            user,
        });
    } catch (err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: 'error',
            details: err.errors || err.message,
        });
    }
};
