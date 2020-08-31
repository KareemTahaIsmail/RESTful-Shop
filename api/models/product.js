const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    //? type is String because it
    productImage: {type: String, required: true}
});

//* export the product schema
module.exports = mongoose.model('Product', productSchema);