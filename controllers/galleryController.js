import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator';
import GalleryModel from '../models/Gallery.js'
import jwt from 'jsonwebtoken';
import config from 'config'

export const addImage=async(req,res)=>{
    try {
        const doc=new GalleryModel({
            imageUrl:req.body.imageUrl,
            categoryEN:req.body.categoryEN,
            categoryAZ:req.body.categoryAZ,
            categoryRU:req.body.categoryRU,
            descriptionAZ:req.body.descriptionAZ,
            descriptionEN:req.body.descriptionEN,
            descriptionRU:req.body.descriptionRU
        })
        const image=await doc.save()
        res.json(image)
    } catch (error) {
       console.log(error)
       res.status(500).json({
        message:"Не удалось загрузить изображение"
       }) 
    }
}


export const deleteImage=async(req,res)=>{
    try {
        const imageId=req.params.id;
        GalleryModel.findByIdAndDelete(imageId)
        .then(()=>{console.log('success')
        res.json({
            success:true
        })
    })
        .catch((err)=>{
            console.log(err)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(req.params.id)
    }
}
export const getAll=async(req,res)=>{
    try {
        const images=await GalleryModel.find() 
        res.json(images)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Не удалось загрузить изображение"
        })
    }
}
// export const getPartners=async(req,res)=>{
//     try {
//         const images=await GalleryModel.find()
//     const newimages= images.filter(image=>image.category==="partners")
//       res.json(newimages)
//
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const getMyWorks=async(req,res)=>{
//     try {
//         const images=await GalleryModel.find()
//     const newimages= images.filter(image=>image.category==="works")
//       res.json(newimages)
//     } catch (error) {
//         console.log(error)
//     }
// }
//
