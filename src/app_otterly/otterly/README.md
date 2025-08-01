<p align="center">
  <img src="../../../otterlyapi.png" alt="OtterlyAPI Logo" height="150"/>
</p>

<h1 align="center">Bienvenue dans le framework OtterlyAPI 🦦</h1>

---

## 📁 Structure du dossier

Ce dossier contient l'ensemble des **classes de base** mises à disposition pour l'héritage dans les différents modules du framework :

- 📂 `controllers` – Logique métier associée aux routes
- 📂 `middlewares` – Middlewares personnalisés (authentification, validation, etc.)
- 📂 `models` – Représentation et manipulation des données
- 📂 `repositories` – Abstraction de l'accès aux sources de données
- 📂 `routes` – Définition des points d'entrée de l'API
- 📂 `services` – Logique métier indépendante des routes

---

## ⚠️ Bonnes pratiques

Certaines classes présentes dans ces dossiers sont **nécessaires au bon fonctionnement interne d’OtterlyAPI**.

> 🔒 **Merci de ne pas modifier ces fichiers de base directement.**  
> Si vous avez besoin de les adapter, **créez un nouveau fichier** et évitez de réutiliser les modules d’origine fournis par le framework.

De plus :

- ❌ **Ne placez pas vos propres contrôleurs, interfaces ou autres fichiers métiers dans les dossiers internes du framework** (`interfaces`, `controllers`, etc.).
- ✅ Ces dossiers sont réservés aux composants **noyaux d’Otterly** et peuvent faire l’objet de **mises à jour automatiques** lors des évolutions du framework.

---

## 🤝 Contribution

Si vous souhaitez enrichir ce framework :

- Suivez les conventions de nommage existantes.
- Documentez correctement vos classes, méthodes et modules.
- Respectez la séparation des responsabilités.

---

## 🧪 Statut du projet

OtterlyAPI est en **développement actif**.  
Le framework est conçu pour être modulaire, évolutif et facilement intégrable dans des architectures back-end modernes.

---

🦦 *Merci de faire confiance à Otterly. Ensemble, construisons des APIs simples, rapides, efficaces et maintenables !*
