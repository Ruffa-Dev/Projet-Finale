const Commercial = require("../models/Commercial");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

const commercial = {
  /**
   * Log commercial on mobile
   */
  login: (req, res) => {
    Commercial.findOne({ email: req.body.email }, (err, commercial) => {
      if (err) {
        res.status(500).json({
          message: "Erreur",
        });
      } else if (commercial) {
        if (
          bcrypt.compareSync(req.body.password, commercial.password) &&
          commercial.activated
        ) {
          const token = jwt.sign({ id: commercial._id }, "dev", {
            expiresIn: "24h",
          });
          res.json({ message: "Connexion réussie", token, id: commercial._id });
        } else {
          res.status(401).json({ message: "Erreur" });
        }
      } else {
        res.status(401).json({ message: "Erreur" });
      }
    });
  },
  sendMailToClient: (req, res) => {
    const key = {
      k: "csk_a0b3c961d37ca460f8672c12ea22aff8ebe",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(key),
    };
    fetch("https://cityshops.fr/api/v1/smtp", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (!data) {
            res.status(500).json({ message: "An error has occured" });
            return;
          }
          async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.planet-work.com",
              port: 587,
              secure: false,
              auth: {
                user: "cityshops@ruffa-karting.fr", // generated ethereal user
                pass: "lebocal123", // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"CityShops" <contact@cityshops.com>', // sender address
              to: req.body.email, // list of receivers
              subject: "Création compte CityShops ✔", // Subject line
              html:
                '<body style="margin: 0px; padding: 0px;font-family: Arial," "Helvetica", Calibri, sans-serif;background-color:#f5f5f5;color:#000;text-align:center;"><table align="center" cellspacing="0" width="746" border="0" style="background-color:#ffffff;"><tr valign="middle"><td width="746" height="122" align="center" style="text-align:center;"><img src="{LOGO}" width="300" border="0" style="max-width:100%;margin:0 auto;" alt="" /></td></tr></table><table align="center" cellpadding="0" cellspacing="0" width="746" border="0" style="background-color:#fff;"><tr valign="middle" style="background-color: #589442;"><td width="746"  valign="middle" align="center" height="50"><h1 style="color:#fff;padding: 0;margin: 0;">Bienvenue chez CityShops ' +
                req.body.prenom +
                " " +
                req.body.nom +
                '</h1></td></tr><tr valign="middle"><td width="746"><p style="font-size:15px;padding:15px 0px;text-align:left;">Vos identifiants de connexion sont les suivants : <p>Email :' +
                " " +
                req.body.email +
                "</p> <p>Mot de passe : " +
                " " +
                req.body.password +
                '</p></p></td></tr></table><table align="center" cellspacing="0" width="746" border="0" style="background-color:#f5f5f5;"><tr valign="middle"><td width="746" height="60" align="center" style="text-align:center;"><span style="font-size:15px;">À bientôt, le service commercial <a href="https://cityshops.fr"></a>CityShops</span></td></tr></table></body>',
              // html body
            });
            console.log(req.body);
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
          main().catch(console.error);
          res.json({ message: "ok" });
        },
        (error) => {
          console.log(error);
        }
      );
  },
};

module.exports = commercial;
