const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let Course = new Schema({
    courseCode: String,
    courseName: String,
    section: String,
    semester: String,
    students: {
        type:[String],
        default:[]
    }
}, {
    collection: 'courses'
})

module.exports = mongoose.model('Course', Course);