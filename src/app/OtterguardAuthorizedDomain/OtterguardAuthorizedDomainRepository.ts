import {Repository} from "../../otterly/abstractClass/repositories/Repository";
import {OtterguardAuthorizedDomainInterface} from "./OtterguardAuthorizedDomainInterface";

/**
 * OtterguardAuthorizedDomainRepository is a repository class for managing authorized domains.
 * It extends the base Repository class with specific operations designed for handling
 * authorized domain data.
 *
 * @extends Repository<OtterguardAuthorizedDomainInterface>
 */
export class OtterguardAuthorizedDomainRepository extends Repository<OtterguardAuthorizedDomainInterface> {

    constructor() {
        super("otterguard_authorized_domain");
    }

    // Get all authorized domains
    async getAll(): Promise<OtterguardAuthorizedDomainInterface[]> {
        return await this.findAll();
    }

    // Get an authorized domain by ID
    async getById(id: number): Promise<OtterguardAuthorizedDomainInterface | null> {
        return await this.findById(id);
    }

    // Create a new authorized domain
    async create(domain_url: string): Promise<void> {
        await this.query(`INSERT INTO ${this.tableName} (domain_url) VALUES (?)`, [domain_url]);
    }

    // Update an authorized domain
    async update(id: number, domain_url: string): Promise<void> {
        await this.query(`UPDATE ${this.tableName} SET domain_url = ? WHERE id = ?`, [domain_url, id]);
    }

    // Delete an authorized domain
    async delete(id: number): Promise<boolean> {
        await this.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
        return true;
    }
}