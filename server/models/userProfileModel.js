const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({

     photo: {
          type: String,
          required: [true, "image is required"]
     },
     phone:{
          type:Number,
          required:[true,"phone numbe is required"]
     },
     city:{
          type:String,
          required:[true,"city details is required"]
     },
     age:{
          type:Number,
          required:[true,"age is required"]
     },
     gender:{
          type:String,
          required:[true,"gender details is required"]
     },
     height:{
          type:Number,
          required:[true,"height details is required"]
     },
     diet:{
          type:String,
          required:[true,"diet details is required"]
     },
     religion:{
          type:String,
          required:[true,"religion details is required"]
     },
     motherTongue:{
          type:String,
          required:[true,"motherTongue details is required"]
     },
     highestQualification:{
          type:String,
          required:[true,"highestQualification details is required"]
     },
     completion:{
          type:Date,
          required:[true,"completion details is required"]
     },
     jobRole:{
          type:String,
          required:[true,"jobRole details is required"]
     },
     worksAt:{
          type:String,
          required:[true,"worksAt details is required"]
     },
     yearlyIncome:{
          type:Number,
          required:[true,"yearlyIncome details is required"]
     },
     description:{
          type:String,
          required:[true,"description details is required"]
     }, 
     userInfo:{
          type:String,
          required:[true,'user is offline, id is not received']
     }

})

const model = mongoose.model('UserProfileData', UserProfileSchema);
module.exports = model;