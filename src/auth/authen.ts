import { Request, Response, NextFunction } from "express";
import Jwt from "../middleware/Jwt";

class Auth {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized1" });
    }
    try {
      const decoded: any = Jwt.verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.CurrentUser = decoded.user;

      // Attach the decoded token to the request object
    } catch (err: any) {
      return res.status(401).json({ message: "Unauthorized" });

    }

    next();
  }
  allowedRoles(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized1" });
      }
      try {
        const decoded: any = Jwt.verifyToken(token);
        if (!decoded) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        
        req.CurrentUser = decoded.user;
        // Attach the decoded token to the request object
        if (roles.includes(decoded.user.role)) {
          return next();
        }
      } catch (error) {
        return next(error);
      }

      return res.status(403).json({ message: "Forbidden" });

      // Attach the decoded token to the request object
    };
  }

  // Extract the token from the Authorization header
}

const auth = new Auth();
export default auth;
