# `Joueurs Stats`

L'ensemble des joueurs enregistré dans la BDD

## Propriétés

| Nom                  | Type                        | Description                                            |
|----------------------|-----------------------------|--------------------------------------------------------|
| `id`                 | `number`                    | Identifiant unique.                                    |
| `serveur_id`         | `number`                    | Identifiant liant la stat à un serveur.                |
| `compte_id`          | `string`                    | Identifiant du compte de jeu du joueur.                |
| `tmps_jeux`          | `number`                    | Temps de jeu total en secondes.                        |
| `nb_mort`            | `number`                    | Nombre total de morts du joueur.                       |
| `nb_kills`           | `number`                    | Nombre total de kills (tous types confondus).          |
| `nb_playerkill`      | `number`                    | Nombre de joueurs tués par ce joueur.                  |
| `mob_killed`         | `{ [key: string]: number }` | Nombre de mobs tués, indexés par type.                 |
| `nb_blocs_detr`      | `number`                    | Nombre total de blocs détruits.                        |
| `nb_blocs_pose`      | `number`                    | Nombre total de blocs posés.                           |
| `dist_total`         | `number`                    | Distance totale parcourue (en blocs).                  |
| `dist_pieds`         | `number`                    | Distance parcourue à pied.                             |
| `dist_elytres`       | `number`                    | Distance parcourue avec des élytres.                   |
| `dist_vol`           | `number`                    | Distance parcourue en volant (creative ou autre).      |
| `item_crafted`       | `{ [key: string]: number }` | Objets craftés, indexés par identifiant d’objet.       |
| `item_broken`        | `{ [key: string]: number }` | Objets brisés, indexés par identifiant d’objet.        |
| `achievement`        | `{ [key: string]: number }` | Succès/avancées obtenues, indexés par identifiant.     |
| `dern_enregistrment` | `string`                    | Date/heure du dernier enregistrement des statistiques. |
| `premiere_co`        | `string`                    | Date/heure de la première connexion du joueur.         |
| `derniere_co`        | `string`                    | Date/heure de la dernière connexion du joueur.         |
| `playername`         | `string`                    | Nom d’utilisateur choisi par le joueur dans le jeu.    |

## Liste des Routes

L'ensemble de ces routes commence par `/api/joueurs/stats-serveur`

| Méthode | Endpoint                              | Authentification | Paramètres | Description                                                                               |
|---------|---------------------------------------|------------------|------------|-------------------------------------------------------------------------------------------|
| `GET`   | `/`                                   | ❌                | —          | Obtenir toutes les statistiques de tous les joueurs des serveurs                          |
| `GET`   | `/minimum`                            | ❌                | —          | Obtenir une version minimale des statistiques de tous les joueurs des serveurs            |
| `GET`   | `/serveurs-total-playtime`            | ❌                | —          | Obtenir le temps de jeu total de tous les joueurs des serveurs (à convertir en heures)    |
| `GET`   | `/serveurs-total-playtime-per-server` | ❌                | —          | Obtenir le temps de jeu total de tous les joueurs par serveur (à convertir en heures)     |
| `GET`   | `/per-server-uid/:uid`                | ❌                | `uid`      | Obtenir les statistiques d’un joueur pour un serveur donné, à partir de son UID           |
| `GET`   | `/total-stats-uid/:uid`               | ❌                | `uid`      | Obtenir les statistiques totales d’un joueur tous serveurs confondus, à partir de son UID |
| `GET`   | `/stats-by-server/:id`                | ❌                | `id`       | Obtenir les statistiques de tous les joueurs pour un serveur donné                        |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/joueurs/stats-serveur` → Liste toutes les statistiques de tous les joueurs
- `GET /api/joueurs/stats-serveur/per-server-uid/abc123` → Stats du joueur `abc123` sur un serveur
