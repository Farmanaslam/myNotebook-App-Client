const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema=new Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
   },
    title:{
        type:Array,
        required:true
    },
    description:{
        type:Array,
        required:true
    },
    tag:{
    type:Array,
    default:"General"
    },
    date:{
  type: Date,
  default:Date.now()
    }
}
)
module.exports=mongoose.model('notes',notesSchema);