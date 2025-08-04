# `Joueurs`

L'ensemble des joueurs enregistré dans la BDD

## Propriétés

| Nom              | Type      | Description                                                                 |
|------------------|-----------|-----------------------------------------------------------------------------|
| `id`             | `number`  | Identifiant unique du joueur.                                              |
| `utilisateur_id` | `number`  | Identifiant liant le joueur à un utilisateur du système.                   |
| `jeu`            | `string`  | Nom du jeu associé au joueur.                                              |
| `compte_id`      | `string`  | Identifiant du compte de jeu du joueur.                                    |
| `premiere_co`    | `string`  | Date/heure de la première connexion du joueur.                             |
| `derniere_co`    | `string`  | Date/heure de la dernière connexion du joueur.                             |
| `playername`     | `string`  | Nom d’utilisateur choisi par le joueur dans le jeu.                        |


## Liste des Routes

L'ensemble de ces routes commence de `/api/joueurs/`

| Méthode  | Endpoint               | Authentification | Paramètres                                                                                                                    | Description                           |
|----------|------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| `GET`    | `/`                    | ❌                | —                                                                                                                             | Récupère la liste de tous les joueurs |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/joueurs` → Liste tous les joueurs