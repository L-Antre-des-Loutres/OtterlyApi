import express, { Application } from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { ServiceToken } from "./services/service-token";
import {ApiRoute} from "./routes/route-api_routes";
import {RouteJoueursStats} from "./routes/route-joueurs_stats";
import {ServiceJoueurs} from "./services/service-joueurs";
import {RouteAstroLoutreImage} from "./routes/route-astroloutre_image";
import {RouteDiscord} from "./routes/route-discord";

dotevnv.config()

class App {
    public app: Application
    private readonly port: number
    private readonly serviceJoueurs: ServiceJoueurs = new ServiceJoueurs();

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
    }

    private middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(helmet())
    }

    private routes() {
        // Route d'accueil
        this.app.get("/", (req, res) => {
            res.status(200).json({
                message: "API Serveur est en ligne !",
                version: process.env.VERSION ?? "non spécifiée"
            });
        });

        // Route des serveurs
        this.app.use("/api/serveurs", require("./routes/route-serveur").default)
        // Route des routes
        this.app.use("/api/routes", new ApiRoute().router)
        // Route des stats des joueurs
        this.app.use("/api/joueurs/stats-serveur/", new RouteJoueursStats().router)
        // Route des images pour Astroloutre
        this.app.use("/api/astroloutre/images/", new RouteAstroLoutreImage().router )
        // Route de l'authentification discord
        this.app.use("/api/", new RouteDiscord().router)
    }

     private async initService(){
         const intervalMs = 24 * 60 * 60 * 1000; // 86 400 000 ms = 24h

         setInterval(async () => {
             // [TASK] Lancement des tâches périodiques
             console.log("[TASK] Lancement des tâches périodiques ")
             try {
                 await this.serviceJoueurs.registerPlayerName();
             } catch (error) {
                 const err = error as Error;
             }
         }, intervalMs);
    }

    public start() {
        this.middlewares()
        this.routes()
        this.initService()
        this.app.listen(this.port, () => {
            console.log(`L'API Serveur est en route sur le port http://localhost:${this.port}`)
        })
    }
}


async function start() {

    // Génération des tokens initiales
    const tokenService = new ServiceToken();
    await tokenService.generateInitialTokens();

    // Instanciation de l'application
    const app = new App()

    // Lancement de l'application
    app.start()

    // Test de l'API Serveur avec Axios
    // APITest();
    // APITest2();
    // APITest3();

}

start().catch((error) => {
    console.error("Erreur lors du démarrage de l'application :", error)
})


