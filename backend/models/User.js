const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema=new Schema({
    name:{
        type:Array,
        required:true
    },
    email:{
        type:Array,
        required:true,
        unique:true
    },
    passward:{
    type:Array,
    required:true
    },
    date:{
  type: Date,
  default:Date.now()
    }
})
const User=mongoose.model('user',userSchema);
// User.createIndexes()
module.exports=User