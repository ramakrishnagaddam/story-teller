const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/category');
const Story = require('../models/story');
const Volume = require('../models/volume');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Welcome to catageries!"
    });
});

router.put('/', (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryName: req.body.categoryName,
        categoryImageURL: req.body.categoryImageURL,
        categoryDesc: req.body.categoryDesc,
        volume: req.body.volume
    });
    category.save().then(result => {
        res.status(200).json({
            message: "Update the category Succesfully!"
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err
        });
    });
});

router.post('/', (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryName: req.body.categoryName,
        categoryImageURL: req.body.categoryImageURL,
        categoryDesc: req.body.categoryDesc,
        volume: req.body.volume
    });
    category.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Update the category Succesfully!"
        });
    })
    .catch(err => {
        console.log(err);
        
        res.status(500).json({
            message: err
        });
    });
});

module.exports = router;