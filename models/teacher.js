const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name :{
        type: String,
        required:[true,'Please add a name'],
    },
    subject: {
        type: [String],
        required:[true,'must take a subject']
    },
    Degree : {
        type:[String],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('teacher',teacherSchema)