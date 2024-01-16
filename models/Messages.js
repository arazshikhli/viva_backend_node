
import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
  fullName:
  {type:String,required:true},
  phoneNumber:{type:String,required:true,unique:true},
  email:{type:String,unique:true},
  adress:{type:String,required:true,unique:true},
  advertType:{type:String,required:true},
  description:{type:String,required:true},
  status:{type:Boolean,default:false}

})

export default mongoose.model('Message',MessageSchema)