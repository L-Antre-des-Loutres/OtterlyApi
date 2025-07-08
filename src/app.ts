import express, { Application } from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"

// Import des services de l'API
import { ServiceToken } from "./services/service-token";
import {ApiRoute} from "./routes/route-api_routes";
import {RouteJoueursStats} from "./routes/route-joueurs_stats";

dotevnv.config()

class App {
    public app: Application
    private readonly port: number

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
    }

    public start() {
        this.middlewares()
        this.routes()
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


