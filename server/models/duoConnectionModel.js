const mongoose = require("mongoose");

const DuoConnectionSchema = new mongoose.Schema({
     LoggedInUserId: {
          type: String,
          required: [true]
     },
     AcceptingConnectionUser: {
          type: String,
          required: [true,],     
     },
     
})

const model = mongoose.model('DuoConnectionData' ,DuoConnectionSchema);
module.exports = model;