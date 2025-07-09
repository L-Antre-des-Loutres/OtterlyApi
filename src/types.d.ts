declare global {
    namespace NodeJS {
        interface ProcessEnv {

            // General Configuration
            PORT: string;

            // General URL Authentication
            API_URL: string;

            // General Database Configuration
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_CONNEXION_LIMIT: string;
            DB_PORT: string;

            // Palworld String Connexion
            PALWORLD_STRING: string;
            JWT_SECRET: string;
            // Version
            VERSION: string;
            DISCORD_CLIENT_ID: string;
            DISCORD_CLIENT_SECRET: string;
            DISCORD_REDIRECT_URL: string;

        }
    }
}

export {};
