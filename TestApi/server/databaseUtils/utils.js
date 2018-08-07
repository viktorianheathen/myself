import mongoose from "mongoose"
import '../models/index'

const Product = mongoose.model('Product');
const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect('mongodb://localhost:27017/boards', function() {
        console.log('Board was connected')
    });
}
export function setUpConnectionUsers() {
    mongoose.connect('mongodb://localhost:27017/users', function(){
        console.log('Users in connect')
    });
}
/* =========== Added product =========== */
export function createProduct(data) {
    const product = new Product({
        title: data.title,
        description: data.description,
        productImage: data.productImage
    });
    return product.save();
}
export function getProducts() {
    return Product.find();
}
export function getProduct(id) {
    return Product.findById(id);
}
export function updateProduct(id, body) {
    return Product.findByIdAndUpdate({_id: id }, body);
}
export function deleteProduct(id) {
    return Product.findById(id).remove();
}
/* =========== //// Added board =========== */

/* =========== Added user =========== */
export function registerUser(data) {
    const user = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar || null
    });
    return user.save()
}
export function updateUser(id, body) {
    return User.findByIdAndUpdate({_id: id }, body);
}
export function getUsers() {
    return User.find();
}
export function getUserOne(id) {
    return User.findOne(id);
}
/* =========== //// Added user =========== */
