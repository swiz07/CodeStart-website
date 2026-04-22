const lessons = require('../models/lessons');
const Lesson = require('../models/lessons')
const Progress=require('../models/progress')

//get lesson by id
exports.getLessonById = async (req, res) => {
     try {
            const lessonId=req.params.id;
            const lesson = await Lesson.findById(lessonId);
            if(!lesson){
                return res.status(404).json({msg:'Lesson not found'})
            }
            res.status(200).json(lesson);
        }
        catch (err) {
            res.status(500).json({ msg: 'Internal Server Error!' })
        }
}

//get all lessons
exports.getLessons = async (req, res) => {
 try {
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//update lesson
exports.updateLesson = async (req, res) => {
try {
        const { id } = req.params
        const updatedLesson = await Lesson.findByIdAndUpdate(
            id, req.body,
            { new: true }
        )

        //if lesson not found
        if (!updatedLesson) {
            return res.status(404).json({ msg: "Lesson not found" });
        }
        res.status(200).json({ msg: 'Updated successfully', lesson: updatedLesson })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};

//delete lesson
exports.deleteLesson = async (req, res) => {
     try {
            const { id } = req.params;
            const result = await Lesson.findByIdAndDelete({ _id: id })
    
            
            if (!result) {
                return res.status(404).json({ msg: "Lesson not found" });
            }
            res.status(200).json({ msg: 'Lesson deleted successfully', result })
        }
        catch (err) {
            res.status(500).json({ msg: 'Internal Server Error!' })
        }
};

