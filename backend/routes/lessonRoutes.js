const profileController=require('../controllers/profileController')
const router=express.Router();
const LessonController=require('../controllers/lessonController')

//get lesson by id
router.get("/lessons/:id", LessonController.getLessonById);//uses middleware to protect these routes (authenticateJWT)

//update lesson
router.put("/lessons/:id", authenticateJWT, LessonController.updateLesson)


//delete lesson
router.delete("/lessons/:id", authenticateJWT, LessonController.deleteLesson)

//lesson complete
router.post('/lesson/:id/complete', LessonController.markLessonComplete)

module.exports=router;

