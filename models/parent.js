const mongoose = require('mongoose')

const parentSchema = new mongoose.Schema({
    name :{
        type: String,
        required
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
})