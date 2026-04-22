const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courseController');

// ================= COURSES =================

// Get all courses (public)
router.get("/", coursesController.getCourses);

// Get single course by id (public)
router.get("/:id", coursesController.getCourseById);

// Create a new course (public for demo)
router.post("/", coursesController.createCourses);

// Update a course (public for demo)
router.put("/:id", coursesController.updateCourse);

// Delete a course (public for demo)
router.delete("/:id", coursesController.deleteCourse);

// ================= LESSONS =================

// Add lesson to a course (public for demo)
router.post("/:id/lessons", coursesController.addLesson);

module.exports = router;