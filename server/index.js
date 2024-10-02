const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./models/Todo")

const app = express()
app.use(cors())
app.use(express.json())

// DB Connection
mongoose.connect("mongodb://localhost:27017/TODO-DB")

app.get("/get",async(req,res)=>{
    try{
        const data = await TodoModel.find({})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({err:"Failed to get todos"})
    }
})


app.post("/add",async (req,res)=>{
    const task = req.body.task;
    try{
        const newTask = await TodoModel.create({task})
        return res.status(201).json(newTask)
    }catch(err){
        return res.status(500).json({err:"Failed to create task"})
    }
})


app.put("/update/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        // console.log(id)
        const result = await TodoModel.findByIdAndUpdate({_id:id},{done:true},{ new: true });
        if (!result) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({message:"Updated Successfully",message})
    }catch(err){
        return res.status(404).json({err:"Error while updating"})
    }
})

app.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const result = await TodoModel.findByIdAndDelete({_id:id});
        return res.status(200).json({message:"Deleted successfully"})
    }catch(err){
        console.log(err)
    }
})

app.listen(3000,()=>{
    console.log("App is listening on port 3000")
})