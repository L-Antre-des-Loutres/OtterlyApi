// src/db.ts
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Créer une connexion MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port : Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNEXION_LIMIT),  // Nombre maximum de connexions simultanées
    queueLimit: 0,  // Pas de limite dans la file d'attente
});

export default db;
