const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    userType: {
        type: String,
        enum: ["student", "tutor"],
        required:true
    },
    grade: {type: Number, required:true},
    language: {type: String, required:true},
    subjects: [{type: String, required:true}],
    phoneNumber: {type:Number}
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {UserModel}