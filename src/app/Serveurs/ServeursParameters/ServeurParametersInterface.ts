/**
 * ServeurParametersInterface defines the structure of parameters associated with a server.
 *
 * This interface includes necessary details such as server IDs, host information,
 * and remote control settings required for server configuration and communication.
 *
 * Properties:
 * - id: A unique identifier for the server parameter set.
 * - serveurs_id: A unique identifier linking this parameter set to a specific server.
 * - host: The hostname or IP address of the server.
 * - rcon_host: The remote control (RCON) host address for server management.
 * - rcon_port: The port number for the RCON connection.
 * - rcon_password: The password used for authentication in the RCON connection.
 */

export interface ServeurParametersInterface {
    id: number
    serveurs_id: number
    host: string
    rcon_host: string
    rcon_port: string
    rcon_password: string
}