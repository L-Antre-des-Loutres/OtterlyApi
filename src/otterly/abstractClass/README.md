## 📁 Structure du dossier

Ce dossier contient l'ensemble des **classes abstraites** mises à disposition pour l'héritage dans les différents modules du framework :

- 📂 `controllers` – Logique métier associée aux routes
- 📂 `middlewares` – Middlewares personnalisés (authentification, validation, etc.)
- 📂 `models` – Représentation et manipulation des données
- 📂 `repositories` – Abstraction de l'accès aux sources de données
- 📂 `routes` – Définition des points d'entrée de l'API
- 📂 `services` – Logique métier indépendante des routes


## ⚠️ Bonnes pratiques

Certaines classes présentes dans ces dossiers sont **nécessaires au bon fonctionnement interne d’OtterlyAPI**.

> 🔒 **Merci de ne pas modifier ces fichiers de base directement.**  
> Si vous avez besoin de les adapter, **créez un nouveau fichier** et évitez de réutiliser les modules d’origine fournis par le framework.

De plus :

- ❌ **Ne placez pas vos propres contrôleurs, interfaces ou autres fichiers métiers dans les dossiers internes du framework** (`interfaces`, `controllers`, etc.).
- ✅ Ces dossiers sont réservés aux composants **noyaux d’Otterly** et peuvent faire l’objet de **mises à jour automatiques** lors des évolutions du framework.
