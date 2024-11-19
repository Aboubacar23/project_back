# Mon Annonce API

## Avec docker
### Installer le projet avec Docker
```
git clone <URL> project_api && cd project_api
```

Construire le container Node:
```
docker compose build
```

Réaliser l'installation des dépendances dans le projet :
```
docker compose run monannonce-node npm i
```

### Démarrer le projet avec Docker
```
docker compose up
```

### Arrêter le projet avec Docker
```
docker compose down
```
