const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  pdf_path: {
    type: String,
    required: true,
  },
  img_path: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  notes: {
    type: Array,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//create model for todo
// userSchema.index({ firstname: "text" });
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
