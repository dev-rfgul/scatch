const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        minlength: 3,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String,

})


module.exports = mongoose.model('user', userSchema);