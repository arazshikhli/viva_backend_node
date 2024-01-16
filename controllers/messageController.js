import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator';
import MessageModel from '../models/Messages.js'
import jwt from 'jsonwebtoken';
import config from 'config'



export const addMessage=async(req,res)=>{
    try {
        const doc=new MessageModel({
            fullName:req.body.fullName,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            adress:req.body.adress,
            advertType:req.body.advertType,
            description:req.body.description
        })
        const message=await doc.save()
        res.json(message)
    } catch (error) {
       console.log(error)
       res.status(500).json({
        message:"Не удалось отправить сообщение"
       }) 
    }
}

export const getAllMessages=async(req,res)=>{
    try {
        const messages=await MessageModel.find() 
        res.json(messages)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"не удалось загрузить сообщения"
        })
    }
}

export const getNewMessages=async(req,res)=>{
    try {
        const messages=await MessageModel.find() 
        const newMessages= messages.filter(message=>message.status===false)
        console.log(newMessages)
        if(!newMessages){
            res.json({
                message:"Нет новых заказов."
            })
        }
        res.json(newMessages)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"не удалось загрузить сообщения"
        })
    }
}

export const getOldMessages=async(req,res)=>{
    try {
        const messages=await MessageModel.find() 
        const OldMessages= messages.filter(message=>message.status===true)
        if(!OldMessages){
            res.json({
                message:"Список прочитанных сообщений пуст"
            })
        }
        res.json(OldMessages)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"не удалось загрузить сообщения"
        })
    }
}


export const changeStatus=async(req,res)=>{
    try {
        const messageId=req.params.id
        await MessageModel.updateOne(
        {
            _id:messageId
        },
        {
            fullName:req.body.fullName,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            adress:req.body.adress,
            advertType:req.body.advertType,
            description:req.body.description,
            status:true
        }
        )
        res.json({
            success:true
        })
       
    } catch (error) {
     console.log("Error")
     res.json({
        message:"Ошибка при обновлении"
     })
    }
}

