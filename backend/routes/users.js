const express=require('express');
const { models } = require('mongoose');
const router=express.Router();
const User=require('../models/users')
const usersController = require('../controllers/usersControllers');
const bodyParser=require('body-parser');
const jsonparser=bodyParser.json()

//get all users 
router.get("/users", usersController.getUsers);

//get user by id
router.get("/user/:id", usersController.getUserById);

//get api CREATE
router.post("/user", jsonparser,usersController.createUsers);

//get api UPDATE
router.put("/user:id", jsonparser,usersController.updateUser);

//get api DELETE
router.delete("/user/:id", jsonparser,usersController.deleteUser);

module.exports=router;