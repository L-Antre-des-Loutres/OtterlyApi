import {Routes} from "./Routes";
import {Router} from "express";
import jwt from "jsonwebtoken";

// TODO : REFAIRE PROPREMENT L'ENSEMBLE DES ROUTES

export class RouteDiscord extends Routes {
    public router: Router;

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RouteDiscord, "");
        this.initializeRoutes();
    }

    private readonly RouteDiscord: Routes[] = []

    private initializeRoutes() {
        // Redirige vers Discord OAuth2
        this.router.get("/login", (req, res) => {
            const redirect_uri = encodeURIComponent("https://otterlyapi.antredesloutres.fr/api/auth/discord/callback");
            const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=identify`;
            res.redirect(discordUrl);
        });

        this.router.get("/callback", async (req, res) => {
            const codeParam = req.query.code;
            if (typeof codeParam !== "string") return res.status(400).send("Code Discord manquant ou invalide");
            const code = codeParam;

            if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.JWT_SECRET) {
                throw new Error("Variables d'environnement manquantes");
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
        });

        // Route pour récupérer les infos utilisateur à partir du cookie JWT
        this.router.get('/me', (req, res) => {
            const token = req.cookies?.token;

            if (!req.cookies || !req.cookies.token) {
                return res.status(401).json({ error: 'Token manquant' });
            }

            if (!token) return res.status(401).json({ error: 'Non authentifié' });

            try {
                const user = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as {
                    username: string;
                    avatar: string;
                    id: string;
                };

                const avatarUrl = user.avatar
                    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                    : null;
                res.json({
                    username: user.username,
                    avatarUrl,
                });
            } catch {
                res.status(401).json({ error: 'Token invalide' });
            }
        });
    }
}