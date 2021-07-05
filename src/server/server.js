import express from 'express' ;
import cors from 'cors' ;
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import './initialize-db';
import { connectDB } from './connect-db'
import { addNewTask, updateTask } from './communicate-db';



let port = 7777;
let app = express() ;


app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);
app.listen(port,console.info("Server running, listening on port ", port));

app.post('/task/new',async (req,res)=>{
    // let task = req.body.task;
    await addNewTask(req.body.task);
    res.status(200).send();
});

app.post('/task/update',async (req,res)=>{
    let db = await connectDB();
    await updateTask(req.body.task);
    res.status(200).send();
});
