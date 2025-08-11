# `Badges catégories`

L'ensemble des catégories des badges

## Propriétés

| Nom                 | Type               | Description                  |
|---------------------|--------------------|------------------------------|
| `id`                | `number`           | Identifiant unique du joueur |
| `nom`               | `string`           | Nom de la catégorie du badge |

## Liste des Routes

L'ensemble de ces routes commence de `/api/badges/categories/`

| Méthode | Endpoint | Authentification | Paramètres | Description                                               |
|---------|----------|------------------|------------|-----------------------------------------------------------|
| `GET`   | `/`      | ❌                | —          | Récupère la liste de l'ensemble des catégories des badges |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/badges/categories` → Liste l'ensemble des catégories des badges