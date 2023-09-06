const mongoose = require('mongoose')

const parentSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true
    },
    number:{
        type:Number,
        required:true,

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
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true
    }
})

module.exports = mongoose.model('Parent',parentSchema)