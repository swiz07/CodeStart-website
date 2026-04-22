const express=require('express');
const router=express.Router();
const blogController = require('../controllers/blogController');
const authenticateJWT=require('../middlware/authenicateJWT');

//get all blogs
router.get("/", blogController.getBlogs);

//get a single blog by id
router.get("/:id", blogController.getBlogById);

//create a new blog
router.post("/", blogController.createBlog);

//update a blog
router.put("/:id", blogController.updateBlog);

//delete a blog
router.delete("/:id", blogController.deleteBlog);

module.exports=router;