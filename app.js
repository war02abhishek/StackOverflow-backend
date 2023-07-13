

import express from "express"

import dotenv from "dotenv";

import cors from "cors"

const app = express();
dotenv.config();


import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import qcommentRoutes from './routes/qcomments.js'
import acommentRoutes from './routes/acomments.js'


app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API")
});

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/qcomment', qcommentRoutes)
app.use('/acomment', acommentRoutes)

export default app;
