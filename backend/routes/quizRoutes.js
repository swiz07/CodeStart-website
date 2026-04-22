const quizController=require('../controllers/quizcontroller')
const router=express.Router();

//get quiz by id
router.get("/quiz/:id", quizController.getQuizById);

//update quiz
router.put("/quiz/:id", quizController.getQuizById)


module.exports=router;

