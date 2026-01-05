# Otterguard Authorized Domain

Ce module gère les domaines autorisés pour Otterguard.

## Structure des données

L'interface `OtterguardAuthorizedDomainInterface` définit la structure des données :

- `id` : Identifiant unique du domaine.
- `domain_url` : L'URL du domaine autorisé.

## Endpoints

### GET /api/otterguard/authorized-domain

Récupère la liste de tous les domaines autorisés.

### GET /api/otterguard/authorized-domain/:id

Récupère un domaine autorisé spécifique par son ID.

### POST /api/otterguard/authorized-domain

Crée un nouveau domaine autorisé.

**Body** :

```json
{
  "domain_url": "https://example.com"
}
```

### PUT /api/otterguard/authorized-domain/:id

Met à jour un domaine autorisé existant.

**Body** :

```json
{
  "domain_url": "https://new-example.com"
}
```

### DELETE /api/otterguard/authorized-domain/:id

Supprime un domaine autorisé par son ID.
