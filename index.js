import express from "express";
import mongoose from "mongoose";
import actions from './controllers/actions.js';
const app = express ();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url="mongodb+srv://badarnisuzan:TAqsSGhhNPpV92hs@cluster0.6jmowol.mongodb.net/?retryWrites=true&w=majority";

const port = 3012;

app.use('/api', actions);    

mongoose.connect(mongo_url) 
.then(results => {
    console.log(results);
})
.catch(error => {
    console.log(error);
})

app.listen(port,function(){
    console.log(`server is running via port ${port}`);
})