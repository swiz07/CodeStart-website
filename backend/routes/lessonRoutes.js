const profileController=require('../controllers/profileController')
const LessonController=require('../controllers/lessonController')
const express=require('express');
const router=express.Router();

//get all lessons
router.get("/", LessonController.getLessons);

//get lesson by id
router.get("/:id", LessonController.getLessonById);//uses middleware to protect these routes (authenticateJWT)

//update lesson
router.put("/:id", LessonController.updateLesson)


//delete lesson
router.delete("/:id", LessonController.deleteLesson)

//lesson complete
router.post('/:id/complete', LessonController.markLessonComplete)

module.exports=router;

