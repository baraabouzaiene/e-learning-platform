const mongoose=require('mongoose')

const userModel=require("./userModel")

const etudiantSchema=mongoose.Schema({
cv :{type:String,required:true},
niveau:{type:String,required:true},
image:{type:String},
formations:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"formationModel"
}]



})
userModel.discriminator("etudiant",etudiantSchema)


module.exports=mongoose.model("etudiant")