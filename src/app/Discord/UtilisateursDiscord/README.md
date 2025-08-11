# `Utilisateur Discord`

L'ensemble des joueurs enregistrés dans la BDD

## Propriétés

| Nom                 | Type               | Description                                                 |
|---------------------|--------------------|-------------------------------------------------------------|
| `id`                | `number`           | Identifiant unique du joueur                                |
| `discord_id`        | `string`           | Identifiant Discord unique de l’utilisateur                 |
| `tag_discord`       | `string`           | Tag complet du compte Discord (ex. `Pseudo#1234`)           |
| `pseudo_discord`    | `string`           | Nom d’affichage (pseudo) utilisé sur Discord                |
| `join_date_discord` | `string`           | Date de rejoindre le serveur Discord (format ISO 8601)      |
| `first_activity`    | `string` \| `null` | Date de la première activité connue (ou `null` si inconnue) |
| `last_activity`     | `string` \| `null` | Date de la dernière activité connue (ou `null` si inconnue) |
| `nb_message`        | `number`           | Nombre total de messages envoyés sur le serveur Discord     |
| `avatar_url`        | `string`           | URL de l’avatar Discord de l’utilisateur                    |

## Liste des Routes

L'ensemble de ces routes commence de `/api/utilisateurs_discord/`

| Méthode | Endpoint | Authentification | Paramètres | Description                                              |
|---------|----------|------------------|------------|----------------------------------------------------------|
| `GET`   | `/`      | ❌                | —          | Récupère la liste de l'ensemble des utilisateurs Discord |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/utilisateurs_discord` → Liste l'ensemble des utilisateurs Discord