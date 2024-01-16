import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'
import cors from 'cors'
import config from 'config'
import checkAuth from './utils/checkAuth.js';
import * as path from 'path'
import *as adminControllers from './controllers/authController.js'
import *as galleryControllers from './controllers/galleryController.js'
import *as messageControllers from './controllers/messageController.js'
import { loginValidation, registerValidation, imageValidation } from './validations/validators.js'
import { check } from 'express-validator';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const PORT = config.get('port') || 5001
const MongoUri = config.get('mongoUri', {
    useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.connect(MongoUri)
    .then(() => {
        console.log("DB OK")
    })
    .catch(() => {
        console.log("DB ERROR")
    })


const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())


app.post('/auth/register', registerValidation, adminControllers.register)
app.post('/auth/login', loginValidation, adminControllers.login)
app.get('/auth/me', checkAuth, adminControllers.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
})
app.post('/gallery', checkAuth, galleryControllers.addImage)
app.delete('/gallery/:id', checkAuth, galleryControllers.deleteImage)
app.get('/gallery', galleryControllers.getAll)
// app.get('/gallery/partners',imageValidation,galleryControllers.getPartners)
// app.get('/gallery/works',imageValidation,galleryControllers.getMyWorks)


app.get('/messages', messageControllers.getAllMessages);
app.get('/messages/new', checkAuth, messageControllers.getNewMessages)
app.get('/messages/old', checkAuth, messageControllers.getOldMessages);
app.post('/messages', messageControllers.addMessage)
app.get('/messages/:id', checkAuth, messageControllers.changeStatus)

if (process.env.NODE_ENV === 'production') {
    app.use('', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log(`PORT has been started at port : ${PORT}`)
})