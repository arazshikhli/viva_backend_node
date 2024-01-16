import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator';
import AdminModel from '../models/Admin.js'
import jwt from 'jsonwebtoken';
import config from 'config'
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const login = req.body.login;
        console.log(req.body.login)
        // if (login != config.get('login')) {
        //     return res.status(400).json({
        //         message: "Логин неверен"
        //     })
        // }
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const doc = new AdminModel({
            login: req.body.login,
            email: req.body.email,
            passwordHash: hash
        })
        const admin = await doc.save();

        const token = jwt.sign({
            _id: admin._id
        }, config.get('jwtsecret'), {
            expiresIn: "1d"
        })
        const { passwordHash, ...adminData } = admin._doc
        res.json({
            ...adminData, token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Произошла ошибка при регистрации"
        })
    }
}
export const login = async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ login: req.body.login })
        if (!admin) {
            return res.status(404).json({
                message: "Неверные данные администратора"
            })
        }
        const isValidPAss = await bcrypt.compare(req.body.password, admin._doc.passwordHash)
        if (!isValidPAss) {
            return res.status(403).json({
                message: "Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            _id: admin._id
        }, config.get('jwtsecret'), {
            expiresIn: "1h"
        })
        const { passwordHash, ...adminData } = admin._doc
        res.json({
            admin, token,
            message: "Авторизация прошла успешно"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Произошла ошибка при авторизации"
        })
    }
}
export const getMe = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.adminId);
        if (!admin) {
            return res.status(404).json({
                message: "Администратор не найден"
            })
        }
        const { passwordHash, ...adminData } = admin._doc
        res.json({
            ...adminData
        })

    } catch (error) {
        console.log(error)
    }
}