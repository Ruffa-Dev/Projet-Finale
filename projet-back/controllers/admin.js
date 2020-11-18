const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Commercial = require("../models/Commercial");

const admin = {
  /**
   * Create Admin
   */
  createAdmin: (req, res) => {
    const newAdmin = new Admin({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      activated: req.body.activated,
    });
    newAdmin.save((error) => {
      if (error) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        res.json({
          message: "compte créé ",
        });
      }
    });
  },
  /**
   * Login Admin
   */
  login: (req, res) => {
    Admin.findOne({ email: req.body.email }, (err, admin) => {
      if (err) {
        res.status(500).json({
          message: "Erreur",
        });
      } else if (admin) {
        if (
          bcrypt.compareSync(req.body.password, admin.password) &&
          admin.activated
        ) {
          const token = jwt.sign({ id: admin._id }, "dev", {
            expiresIn: "24h",
          });
          res.json({ message: "Connexion réussie", token });
        } else {
          res.status(401).json({ message: "Erreur" });
        }
      } else {
        res.status(401).json({ message: "Erreur" });
      }
    });
  },
  /**
   * Get Admin List
   */
  getProfileData: (req, res) => {
    Admin.find({}, "lastname firstname email activated", (err, admins) => {
      if (err) {
        res.status(500).json({
          message: "not good",
        });
      } else {
        res.json(admins);
      }
    });
  },
  /**
   * Put edit current admin logged
   */
  editProfileCurrent: (req, res) => {
    req.admin.firstname = req.body.firstname
      ? req.body.firstname
      : req.admin.firstname;
    req.admin.lastname = req.body.lastname
      ? req.body.lastname
      : req.admin.lastname;
    req.admin.email = req.body.email ? req.body.email : req.admin.email;
    req.admin.password = req.body.password
      ? bcrypt.hashSync(req.body.password, 10)
      : req.admin.password;
    req.admin.activated = req.body.activated
      ? req.body.activated
      : req.admin.activated;

    req.admin.save((error) => {
      if (error) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        res.json({ message: "Utilisateur modifié" });
      }
    });
  },
  /**
   *  Put edit one admin in the list
   */
  editAdminList: (req, res) => {
    Admin.findOne({ _id: req.body._id }, (err, admin) => {
      if (err) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        admin.firstname = req.body.firstname
          ? req.body.firstname
          : admin.firstname;
        admin.lastname = req.body.lastname ? req.body.lastname : admin.lastname;
        admin.email = req.body.email ? req.body.email : admin.email;
        admin.password = req.body.password
          ? bcrypt.hashSync(req.body.password, 10)
          : admin.password;
        admin.activated =
          typeof req.body.activated === "boolean"
            ? req.body.activated
            : admin.activated;

        admin.save((error) => {
          if (error) {
            res.status(500).json({
              message: "Erreur",
            });
          } else {
            res.json({ message: "Utilisateur modifié" });
          }
        });
      }
    });
  },
  /**
   *  Create Commercial by admin
   */
  createCommercial: (req, res) => {
    const newCommercial = new Commercial({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      activated: req.body.activated,
    });
    newCommercial.save((error) => {
      if (error) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        res.json({
          message: "compte créé ",
        });
      }
    });
  },
  /**
   * Get commercial list for admin
   */
  getProfileCommercial: (req, res) => {
    Commercial.find(
      {},
      "lastname firstname email activated",
      (err, commercial) => {
        if (err) {
          res.status(500).json({
            message: "not good",
          });
        } else {
          res.json(commercial);
        }
      }
    );
  },
  /**
   * Put admin can edit commercial account
   */
  editCommercialList: (req, res) => {
    Commercial.findOne({ _id: req.body._id }, (err, commercial) => {
      if (err) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        commercial.firstname = req.body.firstname
          ? req.body.firstname
          : commercial.firstname;
        commercial.lastname = req.body.lastname
          ? req.body.lastname
          : commercial.lastname;
        commercial.email = req.body.email ? req.body.email : commercial.email;
        commercial.password = req.body.password
          ? bcrypt.hashSync(req.body.password, 10)
          : commercial.password;
        commercial.activated =
          typeof req.body.activated === "boolean"
            ? req.body.activated
            : commercial.activated;

        commercial.save((error) => {
          if (error) {
            res.status(500).json({
              message: "Erreur",
            });
          } else {
            res.json({ message: "Utilisateur modifié" });
          }
        });
      }
    });
  },
};

module.exports = admin;
