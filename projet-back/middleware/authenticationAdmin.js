const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function authenticationAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.verify(token, "dev");

  if (!decodedToken) {
    res.status(401).json({ message: "Merci de vous connecter" });
    return;
  }
  Admin.findOne({ _id: decodedToken.id }, (err, admin) => {
    if (err) {
      res.status(500).json({
        message: "Une erreur s'est produite. Veuillez réessayer",
      });
    } else if (!admin) {
      res.status(401).json({ message: "Merci de vous connecter" });
    } else {
      req.admin = admin;
      next();
    }
  });
}

module.exports = authenticationAdmin;
