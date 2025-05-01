declare global {
    namespace NodeJS {
        interface ProcessEnv {

            // General Configuration
            PORT: string;

            // General Database Configuration
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_CONNEXION_LIMIT: string;
            DB_PORT: string;

            // Palworld String Connexion
            PALWORLD_STRING: string;

        }
    }
}

export {};
