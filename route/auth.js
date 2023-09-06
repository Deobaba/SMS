const express = require('express')
const {loginParent,loginStudent,loginTeacher,registerParent,registerStudent,registerTeacher} =  require('../controller/auth')

const router = express.Router();

const {teacherModel,studentModel,parentModel}= require('../models')

const  protect  = require('../middleware/auth');



router.route('/register/teacher')
.post(registerTeacher)
.get(protect(teacherModel),loginTeacher)

router.route('/register/student')
.post(registerStudent)
.get(protect(studentModel),loginTeacher)

router.route('/register/student')
.post(registerParent)
.get(protect(parentModel),loginTeacher)


module.exports = router