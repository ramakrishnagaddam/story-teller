var mongoose = require('mongoose');
var Category = require('../model/Category.model');
var fs = require('fs');

let CategoryController = {
    all: async(req, res) => {
        try {
            console.log('Getting all the Categories')
            let category = await Category.find({}).populate({path: "volume", populate: {
                path: "stories",
                model: "Story"
            }});
            res.status(201).json(category);
        }catch(err) {
            res.status(500).json(err);   
        }
    },
    create: async(req, res) => {
        try {    
            console.log(req.file);
            console.log("Adding new category");
            var categoryObject = {
                "_id": new mongoose.Types.ObjectId(),
                "categoryName": req.body.categoryName,
                "categoryImageURL": req.file.filename,
                "categoryDesc": req.body.categoryDesc
            }
            var newCategory = new Category(categoryObject);
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    update: async(req, res) => {
        try{
            console.log("Adding new category");
            var categoryObject = {
                "categoryName": req.body.categoryName,
                "categoryImageURL": req.file.filename,
                "categoryDesc": req.body.categoryDesc
            }
            await Category.findByIdAndUpdate(req.body._id, categoryObject, {new: true});
            res.status(200).json(req.body);
        }catch(err) {
            res.status(500).json(err);
        }
    }
};

module.exports = CategoryController;
