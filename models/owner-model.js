const mongoose = require('mongoose');



const ownerSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String,
    gistin: String,
})
module.exports = mongoose.model('owner', ownerSchema);