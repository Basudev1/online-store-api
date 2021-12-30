const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
name:{
    type: String,
    required: [true, 'Product name is must'],
},
price:{
    type: Number,
    required: [true, 'product price is must'],
},
featured: {
    type: Boolean,
    default: false
},
rating:{
    type: Number,
    default:4.5
},
createdAt:{
    type: Date,
    default: Date.now()
},
company:{
    type: String,
    enum:{
        values: ['ikea','liddy','caressa','marcos'],
        mesage: '{VALUE} is not a valid company'
    }
    // enum: ['ikea','liddy','caressa','marcos']
}
})

module.exports = mongoose.model('Product', productSchema)