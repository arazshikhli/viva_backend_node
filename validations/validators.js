import { body } from "express-validator";

export const registerValidation=[
    body('login',"Логин не менее 5-и символов").isLength({min:5}),
    body('email','Некорректный email').isEmail(),
    body('password',"Пароль слишком короткий (мин:8 символов)").isLength({min:8})
]

export const loginValidation=[
    body('login',"Логин не менее 5-и символов").isLength({min:5}),
    body('password',"Пароль слишком короткий (мин:8 символов)").isLength({min:8})
]

export const imageValidation=[
    body('imageUrl').isURL()
]