import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import jwt from "jsonwebtoken";

/**
 * Controller responsible for handling requests related to the "joueurs" resource.
 * Extends the base Controller functionality and interacts with the JoueursModel
 * to retrieve and manipulate player data.
 */

export class ConnexionController extends Controller {
    constructor() {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /login/
    async discordLogin(req: any, res: any): Promise<void> {
        try {
            const redirect_uri = encodeURIComponent(
                "https://otterlyapi.antredesloutres.fr/api/auth/discord/callback"
            );

            const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=identify`;

            res.redirect(discordUrl);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur interne");
        }
    }

    // GET /callback
    async discordCallback(req: Request, res: Response): Promise<void> {
        try {
            const codeParam = req.query.code;
            if (typeof codeParam !== "string") {
                res.status(400).send("Code Discord manquant ou invalide");
                return;
            }
            const code = codeParam;

            if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.JWT_SECRET) {
                console.error("Variables d'environnement manquantes");
                return
            }

            const params = new URLSearchParams();
            params.append("client_id", process.env.DISCORD_CLIENT_ID);
            params.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
            params.append("grant_type", "authorization_code");
            params.append("code", code);
            params.append("redirect_uri", "https://otterlyapi.antredesloutres.fr/api/auth/discord/callback");
            params.append("scope", "identify");

            const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params.toString(),
            });

            const token = await tokenRes.json();

            const userRes = await fetch("https://discord.com/api/users/@me", {
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                },
            });

            const user = await userRes.json();

            const jwtPayload = {
                id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                avatar: user.avatar,
            };

            const tokenJWT = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.cookie("token", tokenJWT, {
                domain: ".antredesloutres.fr",
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 72 * 60 * 60 * 1000,
                path: "/",
            });

            res.redirect(process.env.DISCORD_REDIRECT_URL ?? "https://antredesloutres.fr");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur interne");
        }
    }

    // GET /me
    async discordMe(req: Request, res: Response): Promise<void> {
        try {
            const token = req.cookies?.token;
            if (!token) {
                res.status(401).json({ error: 'Token manquant ou non authentifié' });
            }

            try {
                const { username, avatar, id } = jwt.verify(
                    token,
                    process.env.JWT_SECRET as string
                ) as { username: string; avatar: string | null; id: string };

                res.json({
                    username,
                    avatarUrl: avatar
                        ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
                        : null,
                });
            } catch {
                res.status(401).json({ error: 'Token invalide' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur interne');
        }
    }
}