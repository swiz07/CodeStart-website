const express=require('express');
const router=express.Router();
const usersController = require('../controllers/usersControllers');
const authenticateJWT=require('../middlware/authenicateJWT');
const authoriseRoles=require('../middlware/authoriserole');

//admin only
router.get("/users",authenticateJWT, authoriseRoles, usersController.getUsers);
router.delete("/user/:id", authenticateJWT, authoriseRoles, usersController.deleteUser);
router.post("/user", authenticateJWT, authoriseRoles, usersController.createUsers);

//logged in users
router.get("/user/:id", authenticateJWT, usersController.getUserById);
router.put("/user/:id",authenticateJWT, usersController.updateUser);


//get current user
router.get("/api/user", authenticateJWT, usersController.getCurrentUser);

module.exports=router;