const express = require("express");
const {TutorAvailableModel} = require("../model/tutorAvailableModel")
const tutorAvailableRouter = express.Router();

//get all the tutor with details
tutorAvailableRouter.get("/allTutor", async (req, res)=>{
    try {
        let tutor = await TutorAvailableModel.find();
        res.send(tutor);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`INTERNAL_SERVER ${error}`})
    }
})

module.exports = {tutorAvailableRouter}