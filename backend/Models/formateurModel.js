const mongoose=require('mongoose')
const userModel=require("./userModel")

const formateurSchema=new mongoose.Schema({
    specialite:{type:String,required:true },// required means champs obligatoire 
    description:{type:String,required:true },
    diplome:{type:String,required:true },
    image:{type:String}

})
userModel.discriminator("formateur",formateurSchema)

module.exports=mongoose.model("formateur")

