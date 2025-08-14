# `Badges infos`

L'ensemble des informations concernant les badges

## Propriétés

| Nom            | Type      | Description                                                |
|----------------|-----------|------------------------------------------------------------|
| `id`           | `number`  | Identifiant unique du joueur                               |
| `nom`          | `string`  | Nom de la catégorie du badge                               |
| `categorie_id` | `number`  | Identifiant de la catégorie à laquelle le badge appartient |
| `actif`        | `boolean` | Indique si le badge est actif ou non                       |
| `image_url`    | `string`  | URL de l’image associée au badge                           |
| `description`  | `string?` | Description optionnelle du badge                           |
| `obtention`    | `string`  | Condition ou méthode d’obtention du badge                  |

## Liste des Routes

L'ensemble de ces routes commence de `/api/badges/infos/`

| Méthode | Endpoint | Authentification | Paramètres | Description                                     |
|---------|----------|------------------|------------|-------------------------------------------------|
| `GET`   | `/`      | ❌                | —          | Récupère l'ensemble des informations des badges |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/badges/infos` → Liste l'ensemble des informations des badges