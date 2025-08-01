import express, {Application} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {TokenService} from "./services/TokenService";
import {ApiRoute} from "./routes/ApiRoutes";

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
        this.app.use(helmet())
        this.app.use(cookieParser());
    }

    // Initialisation des routes
    private routes() {
        // Route d'accueil
        this.app.get("/", (req, res) => {
            res.status(200).json({
                message: "API Serveur est en ligne !",
                version: process.env.VERSION ?? "non spécifiée"
            });
        });

        // Route affichant les entrées de l'API
        this.app.use("/api/routes", new ApiRoute().router)
    }

    private async services(){
        const tokenService = new TokenService();
        await tokenService.generateInitialTokens();
    }

    private async initService() : Promise<void>{
        const intervalMs = 24 * 60 * 60 * 1000; // 86 400 000 ms = 24h
        // Initialisation des services
    }

    public start() {
        this.middlewares()
        this.routes()
        this.initService().then(r => {console.log(r)})
        this.app.listen(this.port, () => {
            console.log(`L'API Serveur est en route sur le port http://localhost:${this.port}`)
        })
    }
}

async function crossOrigin(app: Application, allowedOrigins: string[]){
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }));
}

// Getters
async function getApp() : Promise<Application>{
    return express();
}


async function start() {

    // Génération des tokens initiales
    const tokenService = new TokenService();
    await tokenService.generateInitialTokens();

    // Instanciation de l'application
    const app = new App()

    // Lancement de l'application
    app.start()

}

start().catch((error) => {
    console.error("Erreur lors du démarrage de l'application :", error)
})

