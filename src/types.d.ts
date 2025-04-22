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
            DB_CONNEXION_LIMIT: number;
            DB_PORT: number;

        }
    }
}

export {};
