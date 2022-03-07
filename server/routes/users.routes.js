
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/users.controller')

//get users
router.get('/', userCtrl.getUsers);

//register user
router.post('/register', userCtrl.register);

//login user
router.post('/login', userCtrl.login);

//update user
router.put('/update/:userId', userCtrl.update);

//delete user
router.delete('/delete/:userId', userCtrl.deleteUser);

//get user's courses
router.get('/courses/:userId', userCtrl.getUserCourses)

router.get('/:userId', userCtrl.getUser)

module.exports = router;