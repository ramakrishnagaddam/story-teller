var mongoose = require('mongoose');
var Category = require('../model/Category.model');
var Volume = require('../model/Volume.model');
var Story = require('../model/Story.model');
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

    refresh: async(req, res) => {
        console.log("Refreshing the Categories with new data");
        let category = await Category.find({}).populate({path: "volume"});

        let volumes: Volume[] = [];
        let stories: Story[] = [];
        for (let i = 0; i < category.length; i++) {
            console.log(category[i]);
            let volumeLst = category[i].volume;
            for (let j = 0; j < volumeLst.length; j++) {
                console.log(volumeLst[j]);
                let storyLst = volumeLst[j].stories;
                for (let k = 0; k < storyLst.length; k++) {
                    console.log(storyLst[k]);
                    let storyData = await Story.findById(storyLst[k]);
                    stories.push(storyData);
                    console.log(stories);
                }
                volumeLst[j].stories = stories;
                volumes.push(volumeLst[j]);
            }
            category[i].volume = volumes;
        }
        category.save();
    }
};

module.exports = CategoryController;
