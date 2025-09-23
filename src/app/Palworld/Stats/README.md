# `Palworld Stats`

L'ensemble des statistiques de nos joueurs Palworld.

## Propriétés

| Nom                  | Type     | Description                                            |
|----------------------|----------|--------------------------------------------------------|
| `id`                 | `number` | Identifiant unique.                                    |
| `serveur_id`         | `number` | Identifiant liant la stat à un serveur.                |
| `compte_id`          | `string` | Identifiant du compte de jeu du joueur.                |
| `tmps_jeux`          | `number` | Temps de jeu total en heures décimales.                |
| `nb_mort`            | `number` | Nombre total de morts du joueur.                       |
| `nb_kills`           | `number` | Nombre total de kills (tous types confondus).          |
| `nb_boss_kill`       | `number` | Nombre total de boss tués par le joueur.               |
| `nb_tower_win`       | `number` | Nombre total de tours remportées par le joueur.        |
| `dern_enregistrment` | `string` | Date/heure du dernier enregistrement des statistiques. |
| `serveur_playername` | `string` | Nom d’utilisateur choisi par le joueur sur le serveur. |

## Liste des Routes

L'ensemble de ces routes commence par `/palworld/stats`

| Méthode | Endpoint                          | Authentification | Paramètres | Description                                                        |
|---------|-----------------------------------|------------------|------------|--------------------------------------------------------------------|
| `GET`   | `/palworld/stats`                 | ❌                | —          | Récupère l'ensemble des statistiques de Palworld.                  |
| `GET`   | `/palworld/stats/total-hours`     | ❌                | —          | Récupère le temps de jeu total de tous les joueurs de Palworld.    |
| `GET`   | `/palworld/stats/total-hours/:id` | ❌                | `id`       | Récupère le temps de jeu total pour un serveur donné (serveur_id). |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/palworld/stats` → Liste toutes les statistiques de tous les joueurs
