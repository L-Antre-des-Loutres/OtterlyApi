# Astroloutre Images

Ce module gère les images utilisées dans **Astroloutre**, avec la possibilité de récupérer toutes les images ou de filtrer par jeu.

---

## 📄 Propriétés

| Nom       | Type     | Description                                                    |
|-----------|----------|----------------------------------------------------------------|
| `id`      | `number` | Identifiant unique de l'image                                  |
| `nom`     | `string` | Nom de l'image                                                 |
| `origine` | `string` | Origine ou source de l'image                                   |
| `auteur`  | `string` | Auteur ou créateur de l'image                                  |
| `path`    | `string` | Chemin d'accès ou URL vers l'image                             |
| `jeu`     | `string` | Nom du jeu ou contexte associé à l'image                       |

---

## 🌐 Liste des routes

Toutes ces routes sont accessibles à partir de la base `/api/astroloutre/images/`.

| Méthode | Endpoint           | Authentification | Paramètres | Description                                             |
|---------|--------------------|------------------|------------|---------------------------------------------------------|
| `GET`   | `/`                | ❌                | —          | Récupère toutes les images Astroloutre                  |
| `GET`   | `/:jeu`            | ❌                | `jeu`      | Récupère toutes les images Astroloutre d’un jeu précis  |

> ℹ️ Toutes les routes actuelles sont publiques et ne nécessitent pas d’authentification.

---

## 📌 Exemple d’utilisation

- `GET /api/astroloutre/images`  
  → Retourne toutes les images disponibles.

- `GET /api/astroloutre/images/Minecraft`  
  → Retourne uniquement les images associées au jeu **Minecraft**.
