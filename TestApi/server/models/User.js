import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model('User', UserScheme)
