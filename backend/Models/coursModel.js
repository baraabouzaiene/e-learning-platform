const mongoose  = require("mongoose");


const gallerySchema=new mongoose.Schema({

   Image:{type:String}
})
const coursSchema=new mongoose.Schema({

    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    nombre:{type:Number,required:true},
    gallery:[gallerySchema],
    formationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "formationModel",
        required:true
    },
    formateurId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"formateurModel"
    }
})

module.exports=mongoose.model("cours",coursSchema)