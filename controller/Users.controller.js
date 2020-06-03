var mongoose = require('mongoose');
var Users = require('../model/User.model');
var Volume = require('../model/Volume.model');

let UsersController = {
    all: async(req, res) => {
        try {
            console.log('Getting all the Users')
            let users = await Users.find({})
            .populate({
                path: "purchases", 
                populate: {
                    path: "stories",
                    model: "Story"
                }
            });
            res.status(201).json(users);
        }catch(err) {
            res.status(500).json(err);   
        }
    },
    id: async(req, res) => {
        try {
            let user = await Users.find({emailID: req.header('emailID')})
            .populate({
                path: "purchases", 
                populate: {
                    path: "stories",
                    model: "Story"
                }
            });
            res.status(201).json(user);
        } catch(err) {
            res.status(500).json(err); 
        }
    },
    create: async(req, res) => {
        try {    
            console.log("Adding new user");
            var userObject = {
                "_id": new mongoose.Types.ObjectId(),
                "emailID": req.body.emailID,
                "credits": 0
            }
     	    let user = await Users.find({emailID: req.body.emailID});
            if(user === null) {
	    	var newUser = new Users(userObject);
            	await newUser.save();
            	res.status(201).json(newUser);
	    } else {
		res.status(400).json({ "message": "User Already exists" });
	    }
        } catch(err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try{
            let user = await Users.find({emailID: req.body.emailID});
            var userObject = {
                "emailID": user[0].emailID,
                "credits": req.body.credits
            };
            console.log(user[0]);
            await Users.findByIdAndUpdate(user[0]._id, userObject, {new: true});
            res.status(201).json({message: "user update"});
        } catch(err) {
            res.status(400).json(err);
        }
    },
    purchase: async(req, res) => {
        try{
            let user = await Users.find({emailID: req.body.emailID});
            console.log(user);
            let volume = await Volume.findById(req.body.volume);
            user[0].purchases.push(volume);
            await user[0].save();
            res.status(200).json(user);
        }catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

module.exports = UsersController;
