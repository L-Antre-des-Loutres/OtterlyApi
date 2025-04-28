// Test de l'API Serveur avec Axios

import axios from "axios";
import { ServeurMinecraftInstallationInterface } from "../interfaces/ServeurInstallationInterfaces";

const token = "MON TOKEN"; // Remplacez par votre token d'authentification


export function APITest3() {
    const url = "http://localhost:3017/api/serveurs";
    /*
        axios.get(url)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    */
    /*
        // POST Avec token d'authentification
        axios.post(url, {
            nom: "Serveur Test",
            jeu: "Minecraft",
            version: "1.19.2",
            modpack: "Minecraft",
            modpack_url: "https://www.minecraft.net/en-us/download/server/vanilla",
            nom_monde: "Test",
            embed_color: "#000000",
            path_serv: "C:/Users/perod/Documents/API-Serveur/API Serveur TS/serveur.bat",
            start_script: "start",
            actif: true,
            global: false,
        }, {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(response => {
            console.log(response.status);
        })
        .catch(error => {
            
        });
        */
    /*
 // Lancement du serveur
 axios.post(url + "/start/", {
     id: 21
 }, {
     headers: {
         'Authorization': `${token}`
     }
 })
     .then(response => {
     })

 // Arrêt du serveur
 axios.post(url + "/stop/", {
     id: 21
 }, {
     headers: {
         'Authorization': `${token}`
     }
 })
     .then(response => {
     })
     */

    // Préparation de la variable d'installation
    const serveurInstallation : ServeurMinecraftInstallationInterface = {
        discord_id: "1234567890",
        nom_serveur: "Serveur Test",
        version: "1.19.2",
        modpack_name: "Minecraft",
        embed_color: "#000000",
        serveur_loader: "C:/Users/perod/Documents/API-Serveur/API Serveur TS/serveur.bat",
        modpack_url: "https://www.minecraft.net/en-us/download/server/vanilla",
        serveur_pack_url: "https://www.minecraft.net/en-us/download/server/vanilla",
    };

    // Installation du serveur
    axios.post(url + "/installation/", {
        serveurInstallation
    }, {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then(response => {
            console.log(response);
        })
}
