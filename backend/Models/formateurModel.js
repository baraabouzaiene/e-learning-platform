const mongoose=require('mongoose')
const userModel=require("./userModel")

const formateurSchema=new mongoose.Schema({
    specialite:{type:String,required:true },// required means champs obligatoire 
    description:{type:String,required:true },
    diplome:{type:String,required:true },
    image:{type:String},
    cours:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"coursModel"
    }],
    formations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"formationModel"
    }]

})
userModel.discriminator("formateur",formateurSchema)

module.exports=mongoose.model("formateur")

