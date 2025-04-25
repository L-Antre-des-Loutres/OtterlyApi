<picture>
  <img src="./otterlyapi.png" alt="PyCaret Logo"/>
</picture>

# Otterly API

![GitHub all releases](https://img.shields.io/github/downloads/matheo-1712/OtterlyAPI/total)
![GitHub language count](https://img.shields.io/github/languages/count/matheo-1712/OtterlyAPI)
![GitHub top language](https://img.shields.io/github/languages/top/matheo-1712/OtterlyAPI?color=yellow)
![GitHub forks](https://img.shields.io/github/forks/matheo-1712/OtterlyAPI?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/matheo-1712/OtterlyAPI?style=social)


Otterly API est une API RESTful. Elle est conçue pour être simple d'utilisation et facile à maintenir. Son objectif est de devenir un véritable framework d'API, pensé pour être hautement modifiable et extrêmement facile à prendre en main. Cette API est spécialisée pour [l'Antre des Loutres](https://github.com/L-Antre-des-Loutres), mais elle reste facilement modifiable pour s'adapter à un environnement différent.

# Sommaire
- [Otterly API](#otterly-api)
- [Sommaire](#sommaire)
  - [Fonctionnalités](#fonctionnalités)
  - [Installation](#installation)
  - [Exemple d'utilisation](#exemple-dutilisation)
    - [Création d'un serveur](#création-dun-serveur)
    - [Récupération de tous les serveurs](#récupération-de-tous-les-serveurs)
  - [Auteur](#auteur)
  - [Liaisons avec les autres services de l'Antre des Loutres](#liaisons-avec-les-autres-services-de-lantre-des-loutres)

## Fonctionnalités

- Gestion de table, Création, Suppression, Recherche de données.
- Protocole de token d'authentification pour les requêtes demandant l'authentification.
- Lancement de commande dans un terminal.

## Installation
Pour installer l'API, suivez les étapes suivantes :

1. Clonez le dépôt GitHub :
```bash
git clone https://github.com/matheo-1712/OtterlyAPI.git
```
2. Installez les dépendances :
```bash
npm install
```
3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```
4. Démarrez l'API :
```bash
npm run dev
```

## Exemple d'utilisation

### Création d'un serveur
Pour créer un serveur, vous devez utiliser la route POST `/api/serveurs` avec le corps JSON suivant :



```typescript
import axios from 'axios';

const url = 'http://localhost:3000/api/serveur';
const token = 'VOTRE_TOKEN_ICI';

axios.post(url, {
    nom: "Serveur Test",
    jeu: "Minecraft",
    version: "1.19.2",
    modpack: "Minecraft",
    modpack_url: "https://www.minecraft.net/en-us/download/server/vanilla",
    nom_monde: "Test",
    embed_color: "#000000",
    path_serv: "C:/Users/perod/Documents/API-Serveur/API Serveur TS/serveur.bat",
    start_script: "start",
    actif: true,
    global: false,
}, {
    headers: {
        'Authorization': `${token}`
    }
})
.then(response => {
    console.log(response.status); // Affiche le code de réponse HTTP, ex: 201
})
.catch(error => {
    console.error(error); // Affiche l'erreur si la requête échoue
});
```

### Récupération de tous les serveurs
Pour récupérer tous les serveurs, vous devez utiliser la route GET `/api/serveurs` avec le corps JSON suivant :

```typescript
import axios from 'axios';

    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
```

## Auteur

- [Matheo Pérodeau](https://github.com/matheo-1712)

## Liaisons avec les autres services de l'Antre des Loutres

- [Server Sentinel](https://github.com/Corentin-cott/ServeurSentinel) réalisé par [Corentin Cotterau](https://github.com/Corentin-cott)
- [MultiLoutre](https://github.com/L-Antre-des-Loutres/MultiLoutre) et [Mineotter](https://github.com/Corentin-cott/Mineotter-Bot) réalisé par [Corentin Cotterau](https://github.com/Corentin-cott) et [Matheo Pérodeau](https://github.com/matheo-1712)










