const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    nome: {type: String, unique: true, required: true},
    code: {type: Number, required: true, unique: true},
    image: {type: String, required: true},
    descricao: {type: String, required: true},
    price: {type: String, required: true}
})

module.exports = mongoose.model('product', productSchema)