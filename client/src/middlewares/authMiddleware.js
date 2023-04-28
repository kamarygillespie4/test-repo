const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  try {
    const token = authToken.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = requireAuth;
