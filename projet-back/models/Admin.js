/*
 * Model de Admin
 *
 */

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Admin", adminSchema);
