const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'addd name']
    },
    studentId :{
        type:String,
        required:[true,'Id is needed'],
        unique:true
    },
    tutionPayment : {
        type:Boolean,
        default: false
    },

    subject:{
        type :[{}],
    },
    class :{
        type:String,
        required: true
    },
    sex:{
        type:String,
        required:[true,'specify gender'],
        enum:['make','female']

    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
    }
})