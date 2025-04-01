import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        { res.status(401).json({ error: "Unauthorized: No token provided" });
     return}
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number; role: string };
        (req as any).user = decoded; // Store decoded user in request
        next();
    } catch (error) {
        { res.status(403).json({ error: "Forbidden: Invalid token" });
     return}
    }
};

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
         {res.status(403).json({ error: "Forbidden: You don't have access" });
     return}
    }

    next();
};
