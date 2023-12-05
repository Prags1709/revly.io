const express = require("express");
const cors = require("cors");
const cron = require("node-cron")
const { connection } = require("./config/db");
const { TutorAvailableModel } = require("./model/tutorAvailableModel")
const { userRoute } = require("./router/userRouter");
const { authentication } = require("./middleware/authentication");
const { doubtQuestionRouter } = require("./router/doubtQueryRouter")
const { tutorAvailableRouter } = require("./router/tutorAvailableRoute");
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("WELCOME")
})

app.use("/revly", userRoute);
app.use(authentication)
app.use("/revly", doubtQuestionRouter);
app.use("/revly", tutorAvailableRouter);


// Polling function to update Tutor's latest ping time
const updateTutorPingTime = async () => {
    try {
        const tutors = await TutorAvailableModel.find();

        // Update ping time for each tutor
        const currentTime = new Date();
        await Promise.all(
            tutors.map(async (tutor) => {
                await TutorAvailableModel.findByIdAndUpdate(tutor._id, { lastPingTime: currentTime });
            })
        );

        console.log('Tutor ping times updated!');
    } catch (error) {
        console.error('Error updating tutor ping times:', error);
    }
};

setInterval(updateTutorPingTime, 3000);

//find online tutor based on last ping time
const findOnlineTutors = async () => {
    try {
        // Set the time window for considering tutors as online (within the last 10 seconds)
        const onlineThreshold = new Date(Date.now() - 10000); // 10 seconds ago
        const onlineTutors = await TutorAvailableModel.find({ lastPingTime: { $gt: onlineThreshold } });
        console.log('Current Online Tutors count:', onlineTutors.length);
    } catch (error) {
        console.error('Error finding online tutors:', error);
    }
}

cron.schedule('* * * * * *', findOnlineTutors);

const PORT = process.env.port || 4500;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("DB CONNECTED");
    } catch (error) {
        console.log("DB NOT CONNECTED", error);
    }
    console.log(`port running at ${process.env.port}`);
})
