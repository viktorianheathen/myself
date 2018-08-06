import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ProductScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    }
})

mongoose.model('Product', ProductScheme)
