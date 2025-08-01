<p align="center">
  <img src="../../otterlyapi.png" alt="OtterlyAPI Logo" height="150"/>
</p>

<h1 align="center">Bienvenue dans le framework OtterlyAPI 🦦</h1>

---
## 📁 Structure du dossier

Ce dossier contient l'ensemble des class disponibles pour l'héritage ainsi que l'utilitaires dans les différents modules du framework :

- 📂 `abstractClass` – Contient l'ensemble des classes d'héritage du framework
- 📂 `ApiRoutes` – Classe gérant l'affichage et l'enregistrement des routes
- 📂 `Token` – Contient les classes gérant les tokens, de leur création à leur vérification
- 🗒️ `db.ts` – Classe permettant la connexion à la base de données
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
