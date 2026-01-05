import {Model} from "../../otterly/abstractClass/models/Model";
import {OtterguardAuthorizedDomainInterface} from "./OtterguardAuthorizedDomainInterface";
import {OtterguardAuthorizedDomainRepository} from "./OtterguardAuthorizedDomainRepository";

/**
 * Represents the OtterguardAuthorizedDomainModel class used to manage authorized domains.
 * This class extends the Model class and implements the OtterguardAuthorizedDomainInterface.
 */
export class OtterguardAuthorizedDomainModel extends Model implements OtterguardAuthorizedDomainInterface {
    id: number;
    domain_url: string;
    // Initialization of the repository
    private readonly repository = new OtterguardAuthorizedDomainRepository();

    constructor(data: Partial<OtterguardAuthorizedDomainInterface> = {}) {
        super(data);

        this.id = Number(data.id) || 0;
        this.domain_url = data.domain_url ?? "";
    }

    // Get all authorized domains
    async getAll() {
        return await this.repository.getAll();
    }

    // Get an authorized domain by ID
    async getById(id: number) {
        return await this.repository.getById(id);
    }

    // Create a new authorized domain
    async create(domain_url: string) {
        await this.repository.create(domain_url);
    }

    // Update an authorized domain
    async update(id: number, domain_url: string) {
        await this.repository.update(id, domain_url);
    }

    // Delete an authorized domain
    async delete(id: number) {
        await this.repository.delete(id);
    }
}
