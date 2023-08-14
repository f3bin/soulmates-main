const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "name is required"]
     },
     email: {
          type: String,
          required: [true, "email is required"],
          unique: true,
     },
     password: {
          type: String,
          required: [true, "Password is required"],

     }
})

const model = mongoose.model('UserData' ,UserSchema);
module.exports = model;