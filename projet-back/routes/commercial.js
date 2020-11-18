const express = require("express");
const router = express.Router();
const commercial = require("../controllers/commercial");

/* Commercial route */

router.post("/login", commercial.login);

router.post("/send-mail", commercial.sendMailToClient);

module.exports = router;
