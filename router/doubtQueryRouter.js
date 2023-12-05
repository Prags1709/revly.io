const express = require("express");
const {UserModel} = require("../model/userModal")
const {DoubtQueryModel} = require("../model/doubtQueryModel")
const doubtQuestionRouter = express.Router();

//All doubt question in decending order based on created time
doubtQuestionRouter.get("/allDoubt", async (req, res)=>{
    try {
        let data = await DoubtQueryModel.find().sort({createdAt:-1});
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`INTERNAL_SERVER ${error}`})
    }
})

//Add new doubt query/question
doubtQuestionRouter.post("/createDoubt", async (req, res)=>{
    const {userId, subject, question} = req.body;
    let userData = await UserModel.findById({_id:userId})
    try {
        if(userData){
            const {name, grade, language} = userData
            const data = new DoubtQueryModel({name, userId, grade, language, subject, question})
            await data.save();
            res.status(201).send("Doubt question created successfully")
        }else{
            res.status(404).send({message:"something went wrong, data not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`INTERNAL_SERVER ${error}`})
    }
})

module.exports = {doubtQuestionRouter}