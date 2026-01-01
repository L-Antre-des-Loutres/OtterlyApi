# `Utilisateurs Discord Stats`

Ce module gère les statistiques associées aux utilisateurs Discord, incluant le temps vocal et le nombre de messages.

## Liste des routes

Toutes ces routes sont accessibles à partir de la base `/api/utilisateurs_discord/stats`.

| Méthode | Endpoint       | Authentification | Paramètres                 | Description                                    |
|---------|----------------|------------------|----------------------------|------------------------------------------------|
| `GET`   | `/`            | ❌                | —                          | Récupère les stats de tous les utilisateurs    |
| `GET`   | `/:id`         | ❌                | `id` (int)                 | Récupère les stats d'un utilisateur par son ID (table stats) |
| `POST`  | `/`            | ✅                | `body` (json)              | Crée les stats pour un utilisateur             |
| `PUT`   | `/`            | ✅                | `id` (int), `body` (json)  | Met à jour les stats d'un utilisateur          |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification valide via `MiddlewareAuth`.

---

## Modèle de données

```typescript
interface UtilisateursDiscordStatsInterface {
    id: number;
    id_utilisateur: number; // Référence à l'utilisateur Discord
    nb_message: number;
    vocal_time: number;
    date_stats: string;
    voice_channels: Channel[];
    text_channels: Channel[];
}
```
