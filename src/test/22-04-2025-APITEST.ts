// Test de l'API Serveur avec Axios

import axios from "axios";

const token = "MON TOKEN"; // Remplacez par votre token d'authentification


export function APITest() {
    const url = "http://localhost:3000/api/serveurs";

    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    // POST Sans token d'authentification

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
    })
        .then(response => {
            console.log(response.status);
        })
        .catch(error => {
            console.error(error);
        });


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
    
    // DELETE Avec token d'authentification et ID
    axios.delete(url, {
        data: {
            id: 21
        },
        headers: {
            'Authorization': `${token}`
        }
    })
    .then(response => {
        console.log(response.status);
    })
}
