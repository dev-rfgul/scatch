const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')

router.get('/', (req, res) => {
    res.send("hello world");
})

console.log(process.env.NODE_ENV);
// i have initialized the environments variables of node to development and it will check the route if its development then the create route will not be pushed

if (process.env.NODE_ENV === 'development') {

    router.post('/create', async (req, res) => {
        let owner = await ownerModel.find();
        if (owner.length > 0) return res.status(503).send("You dont have the rights to create a new Owner")
        res.send("we can create owner") 
        let { fullName, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    })
}

module.exports = router;