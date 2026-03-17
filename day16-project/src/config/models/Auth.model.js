const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
    type :String,
    required : true,
    minlength :3 ,
   },
   email :{
    type:String,
    required : [true,"email is required.."],
    unique:[true, "This email have a Account..."]
   },
   age:{
    type : Number,
    Min : 18,
    Max: 60,
   }

})
const User = mongoose.model("User",userSchema);

module.exports = User;
