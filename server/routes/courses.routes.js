

const express = require('express');
const router = express.Router()
const courseCtrl = require('../controllers/courses.controller')

router.get('/', courseCtrl.getCourses);

router.post('/add', courseCtrl.addCourse);

router.put('/update/:courseId', courseCtrl.updateCourse);

router.get('/:courseId', courseCtrl.getCourse);

router.delete('/delete/:courseId', courseCtrl.deleteCourse);

router.post('/take/:courseId', courseCtrl.takeCourse);

router.post('/drop/:courseId', courseCtrl.dropCourse);

router.get('/students/:courseId', courseCtrl.getCourseStudents)

module.exports = router;