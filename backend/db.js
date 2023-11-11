const mongoose=require("mongoose");
const mongoURI="mongodb://0.0.0.0:27017/mynotebook";

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("Mongoose Connected");
}
module.exports=connectToMongo;