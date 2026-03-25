const Course = require('../models/courses')
const Lesson = require('../models/lessons')
const Quiz=require('../models/quiz')

//get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//create course
exports.createCourses = async (req, res) => {
    try {
        const { title, course_image, description, category, language, difficulty_level, course_duration, students_enrolled } = req.body;
        if (!title || !description || !category || !course_duration) {
            return res.status(400).json({ message: "Required fields missing" })
        }
        const existingCourse = await Course.findOne({ title });

        if (existingCourse) {
            return res.status(400).json({ msg: "Course already exists" });
        }

        const newCourse = new Course({
            title,
            course_image,
            description,
            category,
            language,
            difficulty_level,
            course_duration,
            students_enrolled
        })
        await newCourse.save();
        res.status(201).json({ msg: 'Course created successfully' })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//update course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params
        const updatedCourse = await Course.findByIdAndUpdate(
            id, req.body,
            { new: true }
        )

        if (!updatedCourse) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ msg: 'Updated successfully', course: updatedCourse })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};

//delete course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Course.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ msg: 'Course deleted successfully', result })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};

//get course by id
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate({
                path: 'lessons',
                options: { sort: { order: 1 } }
            })
            .populate('quizzes');

        if (!course) {
            return res.status(404).json({ message: 'Course not found' })
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error!' });
    }
}

//add a lesson to a course
exports.addLesson = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, order, content } = req.body;

        //check if the field are empty
        if (!title || !content || order===undefined) {
            return res.status(400).json({ message: "Required fields missing" })
        }

        //check if course exists
        const existingCourse = await Course.findById(courseId)

        if (!existingCourse) {
            return res.status(404).json({ msg: "Course not found" });
        }

        //create new lesson
        const lesson = new Lesson({
            title,
            order,
            content
        })
        await lesson.save();

        //attach lesson to course
        existingCourse.lesson.push(lesson._id);
        await course.save()
        res.status(201).json({ msg: 'Lesson added successfully', lesson, course })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//add quiz to a course
exports.addQuiz = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, order} = req.body;

        //check if the field are empty
        if (!title || order===undefined) {
            return res.status(400).json({ message: "Required fields missing" })
        }

        //check if course exists
        const existingCourse = await Course.findById(courseId)

        if (!existingCourse) {
            return res.status(404).json({ msg: "Course not found" });
        }

        //create new lesson
        const quiz = new Quiz({
            title,
            order
        })
        await quiz.save();

        //attach quiz to course
        existingCourse.quizzes.push(quiz._id);
        await course.save()
        
        res.status(201).json({ msg: 'Quiz added successfully', quiz, course })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}