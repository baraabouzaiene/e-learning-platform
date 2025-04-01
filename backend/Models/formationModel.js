const mongoose=require('mongoose')
const { default: Courses } = require('../../frontend/src/components/Courses')

const formationSchema=new mongoose.Schema({
    Title:{type:String},// required means champs obligatoire 
    description:{type:String},
    startDate:{type:String},
    endDate:{type:String},
    Courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "coursModel" // reference to the Cours model
        }
    ]
})

module.exports=mongoose.model("formation",formationSchema)

