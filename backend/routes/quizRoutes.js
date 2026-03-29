const quizController=require('../controllers/quizcontroller')
const router=express.Router();
const courseController=require('../controllers/courseController')

//get quiz by id
router.get("/quiz/:id", quizController.getQuizById);

//update quiz
router.put("/quiz/:id", quizController.getQuizById)


router.get('/quiz/:id/result')

router.post('/quiz/:id/submit')

module.exports=router;

