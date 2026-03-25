const express=require('express');
const profileController=require('../controllers/profileController')
const router=express.Router();
const authenticateJWT=require('../middlware/authenicateJWT')

//get profile
router.get("/",authenticateJWT, profileController.getUser);//uses middleware to protect these routes (authenticateJWT)

//update profile
router.put("/", authenticateJWT, profileController.updateProfile)

module.exports=router;

