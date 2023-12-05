const mongoose = require("mongoose");
const {UserModel} = require("./userModal")

const tutorAvailableSchema = mongoose.Schema({
    name: {type: String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:UserModel, required:true},
    grade: {type: Number, required:true},
    language: {type: String, required:true},
    subjects: [{type: String, required:true}],
    lastPingTime: {type: Date, required: true}
})

const TutorAvailableModel = mongoose.model("tutorAvailable", tutorAvailableSchema)

module.exports = {TutorAvailableModel}