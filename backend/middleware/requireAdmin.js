const jwt = require("jsonwebtoken");

module.exports = function requireAdmin(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    if (payload.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
