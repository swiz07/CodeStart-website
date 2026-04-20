const Blog = require('../models/blogs')

//get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//create a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, author, category, isPublished, coverImage } = req.body;
        //checks if the fields are empty 
        if (!title || !content || !category || !coverImage) {
            return res.status(400).json({ message: "Required fields missing" })
        }
        const existingBlog = await Blog.findOne({ title });

        //checks if the blog exists 
        if (existingBlog) {
            return res.status(400).json({ msg: "Blog already exists" });
        }

        //create a new blog if it does not exists 
        const newBlog = new Blog({
            title,
            content,
            author,
            category,
            isPublished,
            coverImage
        })
        await newBlog.save();
        res.status(201).json({ msg: 'Blog created successfully', blog:newBlog })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//update an existing Blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, req.body,
            { new: true }
        )

        //if blog is not found
        if (!updatedBlog) {
            return res.status(404).json({ msg: "Blog not found" });
        }
        res.status(200).json({ msg: 'Updated successfully', blog: updatedBlog })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};

//delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Blog.findByIdAndDelete(id)

        //if the blog is not found
        if (!deleted) {
            return res.status(404).json({ msg: "Blog not found" });
        }
        res.status(200).json({ msg: 'Blog deleted successfully', deleted })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};

//get blog by id
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' })
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

}