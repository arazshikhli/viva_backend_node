
import mongoose from "mongoose";

const GallerySchema=new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true,
        unique:true
    },
    categoryAZ:{
        type:String,
        required:true
    },
    categoryEN:{
        type:String,
        required:true
    },
    categoryRU:{
        type:String,
        required:true
    },
    descriptionAZ:{type:String},
    descriptionEN:{type:String},
    descriptionRU:{type:String},
},{
    timestamps:true
})

export default mongoose.model('Gallery',GallerySchema)