const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name :{
        type: String,
        required:[true,'Please add a name'],
    },

    teacherId :{
        type: String,
        required:[true,'Id is needed'],
        unique: true
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

})

module.exports = mongoose.model('teacher',teacherSchema)