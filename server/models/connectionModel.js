const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
     LoggedInUserId: {
          type: String,
          required: [true]
     },
     SecondUserId: {
          type: String,
          required: [true,],     
     },
     
})

const model = mongoose.model('ConnectionData' ,ConnectionSchema);
module.exports = model;