const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const error = [];
    res.render("index",{error})
});