# `Serveurs`

L'ensemble des serveurs enregistré dans la BDD

## Propriétés

| Nom              | Type      | Description                                                                |
|------------------|-----------|----------------------------------------------------------------------------|
| `id`             | `number`  | Identifiant unique du serveur.                                            |
| `nom`            | `string`  | Nom du serveur.                                                           |
| `jeu`            | `string`  | Nom du jeu hébergé par le serveur.                                       |
| `version`        | `string`  | Version du jeu ou du logiciel serveur.                                   |
| `modpack`        | `string`  | Nom du modpack utilisé, s’il y en a un.                                  |
| `modpack_url`    | `string`  | URL du modpack, si applicable.                                           |
| `nom_monde`      | `string`  | Nom du monde de jeu hébergé sur le serveur.                              |
| `embed_color`    | `string`  | Couleur utilisée pour les intégrations (ex : dans un message Discord).   |
| `contenaire`     | `string`  | Nom ou identifiant du conteneur gérant le serveur.                       |
| `description`    | `string`  | Description textuelle du serveur.                                        |
| `actif`          | `boolean` | Indique si le serveur est actuellement actif.                            |
| `global`         | `boolean` | Indique si la configuration du serveur est globale.                      |
| `type`           | `string`  | Type de serveur (ex: `vanilla`, `moddé`, etc.).                  |
| `image` *(optionnel)* | `string`  | URL ou chemin d’accès à une image illustrative du serveur.              |


## Liste des Routes

L'ensemble de ces routes commence de `/api/serveurs/`

| Méthode | Endpoint                        | Authentification | Paramètres                 | Description                                                     |
|---------|----------------------------------|------------------|----------------------------|-----------------------------------------------------------------|
| `GET`   | `/`                              | ❌               | —                          | Récupère la liste de tous les serveurs.                         |
| `GET`   | `/infos/:id`                     | ❌               | `id`                       | Récupère les informations d’un serveur à partir de son ID.      |
| `GET`   | `/actif-global`                  | ❌               | —                          | Récupère les serveurs actifs avec une configuration globale.    |
| `GET`   | `/actif-global/:jeu`             | ❌               | `jeu`                      | Récupère les serveurs actifs et globaux pour un jeu spécifique. |
| `GET`   | `/primaire-secondaire`           | ❌               | —                          | Récupère les serveurs désignés comme primaire et secondaire.    |
| `POST`  | `/`                              | ✅               | `nom`, `jeu`, `version`, `modpack`, `modpack_url`, `nom_monde`, `embed_color`, `path_serv`, `start_script`, `actif`, `global` | Crée un nouveau serveur (seulement en bdd).                     |
| `DELETE`| `/`                              | ✅               | `id`                       | Supprime un serveur à partir de son ID.                         |
| `POST`  | `/start/`                        | ✅               | `id`                       | Lance un serveur spécifique.                                    |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/serveurs` → Liste tous les serveurs
- `GET /api/serveurs/infos/5` → Récupère les détails du serveur avec ID `5`
- `POST /api/serveurs` avec JSON dans le corps de la requête pour créer un nouveau serveur (auth requis)
- `POST /api/serveurs/start/` avec `{ "id": 5 }` pour démarrer un serveur (auth requis)