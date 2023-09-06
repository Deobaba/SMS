const {ErrorResponse} = require('../utils/errorResponse')
const {asyncHandler} = require('../middleware')
const {studentModel,parentModel,teacherModel} = require('../models')
const {GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils/index');



// @desc      Register teacher
// @route     POST /api/v1/auth/register/teacher
// @access    Admin
exports.registerTeacher = asyncHandler(async(req,res,next)=>{
  const hashedPassword = await GeneratePassword(req.body.password)
  req.body.password = hashedPassword

    const teacher = await teacherModel.create(req.body)

    res.status(200).json({
        success:true,
        data:teacher
    })

})

// @desc      Register student
// @route     POST /api/v1/auth/register/student
// @access    Admin
exports.registerStudent = asyncHandler(async(req,res,next)=>{

  const hashedPassword = await GeneratePassword(req.body.password)
  req.body.password = hashedPassword

    const student = await studentModel.create(req.body)
    
    sendTokenResponse(student.id,200,res)

})

// @desc      Register Parent
// @route     POST /api/v1/auth/register/Parent
// @access    Admin

exports.registerParent = asyncHandler(async(req,res,next)=>{
  const hashedPassword = await GeneratePassword(req.body.password)
  req.body.password = hashedPassword
  const parent = await parentModel.create(req.body)

  res.status(200).json({
    success: true,
    data:parent
  })
})


// @desc      Login Teacher
// @route     POST /api/v1/auth/login
// @access    Admin and Teacher

exports.loginTeacher = asyncHandler(async(req,res,next)=>{
      const {username,password} = req.body

      // validate username and password
      if(!username || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
      }

      // check if teacher exist
      const teacher = await teacherModel.findById(username)

      if(!teacher){
        return  next(new ErrorResponse('Invalid credentials', 401));
      }

      const validPassword = await ValidatePassword(password,teacher.password)


      if (!validPassword) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }

      sendTokenResponse(teacher.id,200,res)

})

// @desc      Login student
// @route     POST /api/v1/auth/login
// @access    Admin and student

exports.loginStudent = asyncHandler(async(req,res,next)=>{
  const {username,password} = req.body

  // validate username and password
  if(!username || !password){
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // check if student exist
  const student = await studentModel.findById(username)

  if(!student){
    return  next(new ErrorResponse('Invalid credentials', 401));
  }

  const validPassword = await ValidatePassword(password,student.password)


  if (!validPassword) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(student.id,200,res)

})

// @desc      Login parent
// @route     POST /api/v1/auth/login
// @access    Admin and parent

exports.loginParent = asyncHandler(async(req,res,next)=>{
  const {username,password} = req.body

  // validate username and password
  if(!username || !password){
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // check if parent has a child in the school
  const student = await studentModel.findById(username)

  if(!student){
    return  next(new ErrorResponse('Invalid credentials', 401));
  }

  const parent = await parentModel.findOne({student:student.id})

  const validPassword = await ValidatePassword(password,parent.password)


  if (!validPassword) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(parent.id,200,res)

})




// Get token from model, create cookie and send response
const sendTokenResponse = (userID, statusCode, res) => {
    // Create token
    const token = GenerateSignature(userID)

    console.log(token)
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token:token
      });
};