/*
 * Model de Commercial
 *
 */

const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  activated: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Commercial", commercialSchema);
