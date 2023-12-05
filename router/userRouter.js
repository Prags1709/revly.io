const express  = require("express")
const {UserModel} = require("../model/userModal")
const {TutorAvailableModel} = require("../model/tutorAvailableModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

let userRoute = express.Router();

//user Register
userRoute.post("/register", async (req, res)=>{
    let {name, email, password, userType, grade, language, subjects, phoneNumber} = req.body
    try {
        bcrypt.hash(password, 4,async (err, securepass)=>{
            if(err){
                res.status(500).send({message:`INTERNAL_SERVER ${err}`})
            }else{
                let user = new UserModel({name, email, password:securepass, userType, grade, language, subjects, phoneNumber})
                await user.save()
                res.status(201).send("User register success")
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`INTERNAL_SERVER ${error}`})
    }
})

//user login and tutor last ping time update
userRoute.post("/login", async (req, res)=>{
    let {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        const hash_pass = user.password
        if(!user){
            res.status(401).send("Please check your password and email or If your new user please Register First")
        }else{
            bcrypt.compare(password, hash_pass,async (err, result)=>{
                if(result){
                    const {_id, name, grade, language, subjects} = user;

                    if(user.userType === "tutor"){
                        const tutor = await TutorAvailableModel.findOne({userId: _id});
                        if(!tutor){
                            const lastPingTime = new Date();
                            const tutorAvailabledata = new TutorAvailableModel({name, userId:_id, grade, language, subjects, lastPingTime});
                            await tutorAvailabledata.save();
                        }else{
                            await TutorAvailableModel.findOneAndUpdate(
                                {userId: _id},
                                {$set: {lastPingTime: new Date()}}
                            )   
                        }
                    }
                    const token = jwt.sign({userId: user._id}, process.env.key)
                    res.status(201).send({"message":"Login successfully", "token": token})
                }else{
                    console.log(err);
                    res.send({message:` INTERNAL_SERVER ${err}`})
                }
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`INTERNAL_SERVER ${error} and Please check your password and email`})
    }
})


module.exports = {userRoute}