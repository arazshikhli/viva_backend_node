import jwt from 'jsonwebtoken'
import { trusted } from 'mongoose';
import config from 'config'
export default (req,res,next)=>{
    const token=(req.headers.authorization||'').replace(
        /Bearer\s?/,''
    );
    if(token){
        try {
            const decoded=jwt.verify(token,config.get('jwtsecret'))
            req.adminId=decoded._id
        } catch (error) {
            return res.status(403).json({
                message:"Нет доступа"
    
            })
            
        }
    }
    else{
        return res.status(403).json({
            message:"Нет доступа"

        })
    }
    next()
}