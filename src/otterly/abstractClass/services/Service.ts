// src/services/Service.ts

/**
 * The Service class provides foundational functionality for other service classes to extend.
 * It includes methods for logging information and errors, as well as utility methods
 * for formatting dates into SQL-compatible strings. This class is meant to be extended
 * and cannot be instantiated directly.
 *
 * - `logInfo` logs an information message with the service label.
 * - `logError` logs an error message with the service label and an optional error message.
 * - `toSQLDate` formats a date into a SQL-compatible string.
 */

export abstract class Service {
    protected label: string;

    protected constructor(label: string) {
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
}
