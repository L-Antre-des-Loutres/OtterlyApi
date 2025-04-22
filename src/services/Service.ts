
// src/services/Service.ts

export abstract class Service {
    protected label: string;

    constructor(label: string) {
        this.label = label;
    }

    protected logInfo(message: string): void {
        console.log(`[${this.label}] ${message}`);
    }

    protected logError(message: string, error?: string): void {
        console.error(`[${this.label}] ${message}`, error || '');
    }

    protected toSQLDate(date: Date): string {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    // Tu peux aussi ajouter d'autres méthodes utiles ici (debug, warn, etc.)
}
