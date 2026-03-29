const express=require('express');
const router=express.Router();
const coursesController = require('../controllers/courseController');
const enrollmentController=require('../controllers/enrollment')

//courses

//get all courses
router.get("/", coursesController.getCourses);

//get a single course by id
router.get("/:id",coursesController.getCourseById);

//create a new course
router.post("/",coursesController.createCourses);

//update a course
router.put("/:id",coursesController.updateCourse);

//delete a course
router.delete("/:id",coursesController.deleteCourse);

//lessons:
//add a lesson to a course
router.post("/:id/lessons", coursesController.addLesson)

//quizzes:

//add a quiz to a course
router.post("/:id/quizzes", coursesController.addQuiz);

router.post("/:id/enroll", enrollmentController.enrollInCourse)

module.exports=router;