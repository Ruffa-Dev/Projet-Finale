const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const authentication = require("../middleware/authenticationAdmin");

/* Admin routes */

router.post("/login", admin.login);

router.post("/create-admin", authentication, admin.createAdmin);

router.post("/create-commercial", authentication, admin.createCommercial);

router.get("/view-admins", authentication, admin.getProfileData);

router.get("/view-commercials", authentication, admin.getProfileCommercial);

router.put("/edit", authentication, admin.editProfileCurrent);

router.put("/edit-admins-list", authentication, admin.editAdminList);

router.put("/edit-commercials-list", authentication, admin.editCommercialList);

module.exports = router;
