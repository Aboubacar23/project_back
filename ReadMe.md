# MonAnnonce - Backend

Ce projet est le backend du projet MonAnnonce. Il utilise Node.js, Express.js, Sequelize et une base de données MySQL hébergée sur Docker. L'objectif est de fournir une API pour la gestion des annonces et des commentaires.

## Membre du groupe
1. Doha EL Achab
2. Souhaila Razfa
3. Aboubacar Sidiki CONDE


## Prérequis

Avant de commencer, assurer d'avoir les outils suivants installés :

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Adminer](https://www.adminer.org/) (inclus dans Docker Compose pour gérer la base de données)

## Installation

1. Clone ce dépôt :
   ```bash
   git clone https://github.com/Aboubacar23/project_back.git
   cd project_back
   ```

2. Lance les conteneurs Docker :
   ```bash
   docker-compose up -d
   ```

   Cela démarre :
   - Un conteneur pour l'API backend
   - Un conteneur pour la base de données MySQL
   - Un conteneur pour Adminer (interface de gestion de la base de données)

3. Installe les dépendances :
   ```bash
   docker compose run monannonce-node npm install
   ```

## Utilisation d'Adminer pour gérer la base de données

1. Accédez à Adminer en ouvrant votre navigateur et en visitant : `http://localhost:8080`

2. Remplissez les informations suivantes pour vous connecter :
   
   - **Serveur** : `monannonce-db`
   - **Utilisateur** : `root`
   - **Mot de passe** : `root`
   - **Base de données** : `my_annonce_db`

3. Une fois connecté, vous pouvez visualiser et gérer les tables (comme `Users`, `Commentaires`, etc.).

## Commandes importantes

### Gestion de la base de données

- Initialiser Sequelize :
  ```bash
  docker compose run monannonce-node npx sequelize-cli init
  ```

- Générer un modèle Sequelize :
  ```bash
  docker compose run monannonce-node npx sequelize-cli model:generate --name NomModel --attributes champ1:type1,champ2:type2
  ```

- Exécuter les migrations :
  ```bash
  docker compose run monannonce-node npx sequelize-cli db:migrate
  ```

- Annuler la dernière migration :
  ```bash
  docker compose run monannonce-node npx sequelize-cli db:migrate:undo
  ```

### Lancer l'application

- En local avec Docker :
  ```bash
  docker-compose up
  ```

- Arrêter les conteneurs :
  ```bash
  docker-compose down
  ```

## API disponibles

### Routes principales

#### Commentaires

- **Lister les commentaires**
  - **GET** `/api/commentaires/list`

- **Ajouter un commentaire**
  - **POST** `/api/commentaires/new`
  - Exemple de payload JSON :
    ```json
    {
      "id": 1,
      "objet": "Problème de réservation",
      "date_commentaire": "2025-01-21",
      "description": "Le restaurant n'était pas accessible."
    }
    ```

- **Voir un commentaire spécifique**
  - **GET** `/api/commentaires/show/:id`

- **Modifier un commentaire**
  - **PUT** `/api/commentaires/edit/:id`

- **Supprimer un commentaire**
  - **DELETE** `/api/commentaires/delete/:id`

## Structure des dossiers

- `monannonce/`
  - `controllers/` : Contient les fichiers de logique métier
  - `models/` : Définit les modèles Sequelize
  - `migrations/` : Contient les fichiers de migration
  - `routes/` : Définit les routes de l'API
  - `middleware/` : Middleware pour la validation et autres traitements

## Remarques

- Toutes les configurations pour Docker et la base de données sont dans `docker-compose.yml`.
- Les migrations Sequelize gèrent la création des tables et les modifications du schéma.
- Utilisez Postman ou une application similaire pour tester les endpoints API.