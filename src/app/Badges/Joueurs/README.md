# `Badges joueurs`

Représente l’ensemble des badges obtenus par les joueurs.

## Propriétés

| Nom         | Type     | Description                                                   |
|-------------|----------|---------------------------------------------------------------|
| `id`        | `number` | Identifiant unique de la relation joueur–badge            |
| `joueur_id` | `number` | Identifiant unique du joueur                                  |
| `badge_id`  | `number` | Identifiant unique du badge                                   |
| `date_recu` | `string` | Date de réception du badge (format ISO 8601, ex. `2025-08-12`) |

---

## Liste des Routes

Toutes ces routes commencent par `/api/badges/joueurs/`

| Méthode | Endpoint | Authentification | Paramètres | Description                                            |
|---------|----------|------------------|------------|--------------------------------------------------------|
| `GET`   | `/`      | ❌                | —          | Récupère la liste de l’ensemble des badges des joueurs |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/badges/joueurs` → Liste tous les badges associés aux joueurs dans le système
