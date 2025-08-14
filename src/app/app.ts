import express, { Application } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import cookieParser from 'cookie-parser';
import { TokenService } from "../otterly/Token/TokenService";
import {ApiRoute} from "../otterly/ApiRoutes/ApiRoutes";
import {ServeursRoutes} from "./Serveurs/ServeursRoutes";
import {JoueursRoutes} from "./Joueurs/JoueursRoutes";
import {JoueursService} from "./Joueurs/JoueursService";
import {JoueursStatsRoutes} from "./Joueurs/JoueursStats/JoueursStatsRoutes";
import {ConnexionRoutes} from "./Discord/Connexion/ConnexionRoutes";
import {UtilisateursDiscordRoutes} from "./Discord/UtilisateursDiscord/UtilisateursDiscordRoutes";
import {AstroloutreImagesRoutes} from "./Astroloutre/Images/ImagesRoutes";
import allowedOrigins from "./allowedOrigins.json";
import {BadgesInfosRoutes} from "./Badges/Infos/InfosRoutes";
import {BadgesCategoriesRoutes} from "./Badges/Categories/CategoriesRoutes";
import {BadgesUtilisateursRoutes} from "./Badges/Utilisateurs/UtilisateursRoutes";
import {BadgesJoueursRoutes} from "./Badges/Joueurs/JoueursRoutes";

dotenv.config()

class App {
    public app: Application
    private readonly port: number

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
    }

    // Gestion des middlewares
    private middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));
        this.app.use(helmet())
        this.app.use(cookieParser());
    }

    // Initialisation des routes
    private routes() {
        // Route d'accueil
        this.app.get("/", (req, res) => {
            res.status(200).json({
                message: "API en ligne !",
                version: process.env.VERSION ?? "non spécifiée"
            });
        });
        // Route des entry de l'API
        this.app.use("/api/routes", new ApiRoute().router)

        // Route des serveurs
        this.app.use("/api/serveurs", new ServeursRoutes().router)

        // Route des joueurs
        this.app.use("/api/joueurs", new JoueursRoutes().router)

        // Route des stats des joueurs
        this.app.use("/api/joueurs/stats-serveur", new JoueursStatsRoutes().router)

        // Route des connexions discord
        this.app.use("/api/auth/discord", new ConnexionRoutes().router)

        // Route des utilisateurs discord
        this.app.use("/api/utilisateurs_discord", new UtilisateursDiscordRoutes().router)

        // Route des images Astroloutre
        this.app.use("/api/astroloutre/images", new AstroloutreImagesRoutes().router)

        // Route des infos des badges
        this.app.use("/api/badges/infos", new BadgesInfosRoutes().router)

        // Route des catégories des badges
        this.app.use("/api/badges/categories", new BadgesCategoriesRoutes().router)

        // Routes listant les badges des utilisateurs
        this.app.use("/api/badges/utilisateurs", new BadgesUtilisateursRoutes().router)

        // Routes listant les badges des joueurs
        this.app.use("/api/badges/joueurs", new BadgesJoueursRoutes().router)

    }

    // Enregistrement des services
    private async services(){
        // Génération des tokens
        const tokenService = new TokenService();
        await tokenService.generateInitialTokens();
        // Enregistrement des pseudos des joueurs
        const joueursService = new JoueursService();
        await joueursService.registerPlayerName()
    }

    // Initialisation des services
     private initService(){
         const intervalMs = 24 * 60 * 60 * 1000; // 86 400 000 ms = 24h
         this.services().then();

         setInterval(async () => {
             // [TASK] Lancement des tâches périodiques
             console.log("[TASK] Lancement des tâches périodiques ")
             try {
                 await this.services()
             } catch (error) {
                 console.error("Erreur lors de l'execution du service", error);
             }
         }, intervalMs);
    }

    public start() {
        this.middlewares()
        this.routes()
        this.initService()
        this.app.listen(this.port, () => {
            console.log(`L'API est en route sur le port http://localhost:${this.port}`)
        })
    }
}
async function start() {
    // Instanciation de l'application
    const app = new App()

    // Lancement de l'application
    app.start()

}

start().catch((error) => {
    console.error("Erreur lors du démarrage de l'application :", error)
})


