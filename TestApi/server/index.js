import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import * as db from './databaseUtils/utils'
import jwt from 'jsonwebtoken'

import mongoose from 'mongoose'
import './models/index'
const User = mongoose.model('User');
const Product = mongoose.model('Product');

/* Module for downloading images */
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime().toString() + '_' + file.fieldname + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage });

let app = express();
let PORT = 3005;

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )
app.use(cors({origin: '*'}) )
app.use('/static', express.static(__dirname + '/public'));

const server = app.listen(PORT, function(){
    console.log('Server is running port: ' + PORT)
    db.setUpConnection()
    db.setUpConnectionUsers()
})

app.get('/', function(req, res){
    res.send('Home page')
})
/*  ==========================================  */
/*  ==================== PRODUCTS ============ */
/*  ==========================================  */
app.get('/products', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            db.getProducts().then(data => res.send(data))
        }
    })
})

/* add product */
app.post('/products', verifyToken, upload.fields([{ name: 'productImage', maxCount: 1 }]), function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            const product = {
                title: req.body.title,
                description: req.body.description,
                productImage: `http://localhost:${PORT}/static/uploads/${req.files.productImage[0].filename}`
            }
            db.createProduct(product).then(data => res.send(data))
        }
    })
})

/* delete one product */
app.delete('/products/:id', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            db.deleteProduct(req.params.id).then(data => res.send(data))
        }
    })
})

/* GET one product */
app.get('/products/:id', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            db.getProduct(req.params.id).then(data => res.send(data))
        }
    })
})

/* Update product */
app.put('/products/:id', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            const product = {
                title: req.body.title,
                description: req.body.description
            }
            db.updateProduct(req.params.id, product).then(data => res.send(data))
        }
    })
})

/* Update product image*/
app.put('/products/:id/image', verifyToken, upload.fields([{ name: 'productImage', maxCount: 1 }]), function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            const productImage = {
                productImage: `http://localhost:${PORT}/static/uploads/${req.files.productImage[0].filename}`
            }
            db.updateProduct(req.params.id, productImage).then(data => res.send(data))
        }
    })
})

/* GET one product image */
app.get('/products/:id/image', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            Product.findById(req.params.id).then(data => res.json({
                file: data.productImage
            }))
        }
    })
})

/*  ==========================================  */
/*  ==================== USERS ============ */
/*  ==========================================  */
app.get('/profile', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            res.send('Profile page')
        }
    })
})

/* ==== Get users ==== */
app.get('/users', verifyToken, function(req, res){
    jwt.verify(req.token, 'sercet_key', function(err, data) {
        if (err) {
            res.sendStatus(403)
        } else {
            db.getUsers().then(data => res.send(data))
        }
    })
})

/* ==== Get one user ==== */
app.get('/users/:id', function(req, res){
    res.send(req.params.id)
})

/* ==== Register api ==== */
app.post('/register', function(req, res, next){
    User.find({ email: req.body.email }).then(user => {
        if (user.length != 0) {
            res.send('User exists')
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    let newUser = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                    db.registerUser(newUser).then(data => res.send(data))
                }
            })
        }
    })
})

/* ==== login api ==== */
app.post('/login', function(req, res){
    User.find({ email: req.body.email }).then(user => {
        if (user.length != 0) {
            const token = jwt.sign({ user : req.body.name }, 'sercet_key')
            res.json({
                token: token
            })
        } else {
            res.status(422).json({
                message : 'User not found'
            })
        }
    })
})

/* ==== verify token function, we need to use it for our protected routes ==== */
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if ( typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}
