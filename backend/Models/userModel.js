const mongoose=require('mongoose')
const userModel=require("./userModel")
const bcrypt=require("bcrypt")// a library use to hash passwords securely

// inheretence
// //base options
const baseOptions = {
    // discriminatoryKey : in mongoose used in inheretance
    //it allows mutiple models to share the same base schema 
    // but diffrentiate themselves using the utemType field

    discriminatorKey : "itemType",
    
    // specifies the name of the mangodb collection where documents of this schema will be stored

    collection: "items"}


const UserSchema=mongoose.Schema({

    name:{type:String,required:true,unique:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
phone:{type:Number,required:true},
code:{type:String},
verify:{type:Boolean,default:false},

},
baseOptions)

// pre save hook for password hashing password hashing
// this is a mongoose middleware function that runs before a document is saved in the database
// How it works:
UserSchema.pre("save", async function(){
    // salt is generated ,where 10 is the cost factor
    // higher values of cost factor  increase security but slow down hashing
    const salt = await bcrypt.genSalt(10)
    // the hashed password is saved in the database before the original is saved in the database
    this.password = await bcrypt.hash(this.password,salt)
})
module.exports=mongoose.model("user",UserSchema)