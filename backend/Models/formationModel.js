const mongoose=require('mongoose')

const formationSchema=new mongoose.Schema({
    Title:{type:String},// required means champs obligatoire 
    description:{type:String},
    startDate:{type:String},
    endDate:{type:String}
})

module.exports=mongoose.model("formation",formationSchema)

