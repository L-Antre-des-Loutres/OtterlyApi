import express, { Application } from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"

// Import des services de l'API
import { ServiceToken } from "./services/service-token";

// Import des tests de l'API
import { APITest } from "./test/22-04-2025-APITEST";
import { APITest2 } from "./test/23-04-2025-APITEST";

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
        this.app.get("/", (req, res) => {
            res.send("Hello World!")
        })
        this.app.use("/api/serveurs", require("./routes/route-serveur").default)
    }

    public start() {
        this.middlewares()
        this.routes()
        this.app.listen(this.port, () => {
            console.log(`L'API Serveur est en route sur le port ${this.port}`)
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

}

start().catch((error) => {
    console.error("Erreur lors du démarrage de l'application :", error)
})


