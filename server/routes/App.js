import express from 'express'
import Auth from './auth.js'
import Friends from './Friends.js'
import User from './User.js'

import verify from '../middlewares/verify.js'
import Chats from './Chats.js'

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/v1", (req, res) => {
    try{
    res.status(200).json({
        status: "success",
        data: [],
        message: "Welcome to Version 1 of out API hompage."});
    }catch(error){
    res.status(500).json({
        status: "fail",
        message: "Internal Server Error"
    })
    }
})

app.use('/api/v1', Auth);
app.use('/api/v1/user',verify, User);
app.use('/api/v1/friends',verify, Friends);
app.use('/api/v1/chats',verify, Chats);


export default app;