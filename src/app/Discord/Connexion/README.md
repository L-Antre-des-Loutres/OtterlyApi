# `Connexion via Discord`

Ce module regroupe l'ensemble des routes nécessaires à l'authentification via Discord.

## Liste des routes

Toutes ces routes sont accessibles à partir de la base `/api/auth/discord/`.

| Méthode | Endpoint    | Authentification | Paramètres | Description                                                       |
|---------|-------------|------------------|------------|-------------------------------------------------------------------|
| `GET`   | `/login`    | ❌                | —          | Redirige l’utilisateur vers l’URL OAuth2 de connexion Discord     |
| `GET`   | `/callback` | ❌                | —          | Traite le code de retour Discord, génère le JWT et crée le cookie |
| `GET`   | `/me`       | ❌                | —          | Récupère les informations de l’utilisateur à partir du cookie     |

> ℹ️ Les routes marquées ✅ nécessitent un token d’authentification valide via `MiddlewareAuth`.

---

## Exemple d’utilisation

- `GET /api/auth/discord/me` → Récupère les informations de l’utilisateur connecté
