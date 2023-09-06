const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'addd name']
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
    isEnrolled:{
        type: Boolean
    },
    ParentName:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:[true,'specify gender'],
        enum:['male','female']

    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
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
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Parent'
    }
})

module.exports = mongoose.model('Student',studentSchema)