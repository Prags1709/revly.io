const mongoose = require("mongoose");
const {UserModel} = require("./userModal")

const doubtQuerySchema = mongoose.Schema({
    name: {type: String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:UserModel, required:true},
    grade: {type: Number, required:true},
    language: {type: String, required:true},
    subject: {type: String, required:true},
    question: {type: String, required:true},
    createdAt: {type: Date, default: new Date(), required: true}
})

const DoubtQueryModel = mongoose.model("doubtQuery", doubtQuerySchema)

module.exports = {DoubtQueryModel}