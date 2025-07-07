// src/models/ApiRoutesModel.ts

import { Model } from "./Model";
import {ApiRoutesInterface} from "../interfaces/ApiRoutesInterfaces";
import {RepositoryApiRoutes} from "../repositories/repository-api_routes";

/**
 * ApiRoutesModel class
 * @classdesc This class represents an API routes model.
 * @extends Model
 * @implements ApiRoutesInterface
 * @classdesc This class represents an API routes model.
 * @sql_table_name api_routes
 * @sql_table_fields id, alias, route, method, parameters, description, comment
 * @sql_table_primary_key id
 */

export class ApiRoutesModel extends Model implements ApiRoutesInterface {
    id: number;
    alias: string;
    route: string;
    method: string;
    parameters: string;
    description?: string;
    comment?: string;

    constructor(
        data: Partial<ApiRoutesModel>,
        private readonly repository = new RepositoryApiRoutes()) {
        super(data);
        this.id = data.id ?? 0;
        this.alias = data.alias ?? "";
        this.route = data.route ?? "";
        this.method = data.method ?? "";
        this.parameters = data.parameters ?? "";
        this.description = data.description ?? "";
        this.comment = data.comment ?? "";
    }

    // Method to convert the model to a JSON object
    toJSON(): Record<string, any> {
        return {
            id: this.id,
            alias: this.alias,
            route: this.route,
            method: this.method,
            parameters: this.parameters,
            description: this.description,
            comment: this.comment,
        };
    }

    async getAll(): Promise<ApiRoutesModel[]> {
        const results = await this.repository.getRoutes()
        return results ? results.map(data => new ApiRoutesModel(data)) : []
    }

}