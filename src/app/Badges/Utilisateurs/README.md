# `Badges utilisateurs`

Représente l’ensemble des badges obtenus par les utilisateurs.

## Propriétés

| Nom               | Type     | Description                                                   |
|-------------------|----------|---------------------------------------------------------------|
| `id`              | `number` | Identifiant unique de la relation utilisateur–badge           |
| `utilisateur_id`  | `number` | Identifiant unique de l’utilisateur                           |
| `badge_id`        | `number` | Identifiant unique du badge                                   |
| `date_recu`       | `string` | Date de réception du badge (format ISO 8601, ex. `2025-08-12`) |

---

## Liste des Routes

Toutes ces routes commencent par `/api/badges/utilisateurs/`

| Méthode | Endpoint | Authentification | Paramètres | Description                                                   |
|---------|----------|------------------|------------|---------------------------------------------------------------|
| `GET`   | `/`      | ❌                | —          | Récupère la liste de l’ensemble des badges des utilisateurs   |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/badges/utilisateurs` → Liste tous les badges associés aux utilisateurs dans le système
