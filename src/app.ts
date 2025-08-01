import express, { Application } from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import cookieParser from 'cookie-parser';
import { TokenService } from "./services/TokenService";

dotevnv.config()
const allowedOrigins = [
    'https://antredesloutres.fr',
    'https://www.antredesloutres.fr',
    'https://qa.antredesloutres.fr',
    'https://build.antredesloutres.fr',
    'https://dev.antredesloutres.fr'
];

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

    private routes() {
        // Route d'accueil
        this.app.get("/", (req, res) => {
            res.status(200).json({
                message: "API Serveur est en ligne !",
                version: process.env.VERSION ?? "non spécifiée"
            });
        });
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


