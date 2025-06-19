const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : String,
    description: String,
    dueDate : Date,
    priority: {type: String , enum: ["Low" , "Medium" , "High"] , default : "Low"},
    status: {type:String , enum : ["Pending" , "Completed"] , default : "Pending"},
    assignedTo : {type:mongoose.Schema.Types.ObjectId , ref:"User"},
});

module.exports = mongoose.model("Task" , taskSchema)