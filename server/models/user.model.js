const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let User = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type:String,
        default:'',
        trim: true,
        required:true,
        unique: true,
        dropDups: true
    },
	passwordHash: {
		type: String,
		default: ''
	},
    address:String,
    city:String,
    phoneNumber:String,
    program:String,
    courses:{
        type:[String],
        default:[]
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', User);