declare global {
    namespace NodeJS {
        interface ProcessEnv {

            // General Configuration
            PORT: string;

            // General URL Authentication
            API_URL: string;

            // Clé pour les token JWT
            JWT_SECRET: string

            // General Database Configuration
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_CONNEXION_LIMIT: string;
            DB_PORT: string;


        }
    }
}

export {};
