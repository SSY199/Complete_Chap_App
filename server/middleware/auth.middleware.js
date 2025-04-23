import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    //console.log(req.cookies);
    const token = req.cookies.jwt;
    //console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
      }

      req.userId = payload.userId;
      req.email = payload.email;
      next();
    });

  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// || req.headers["authorization"]?.split(" ")[1]