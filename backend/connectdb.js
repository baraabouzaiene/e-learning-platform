const mongoose =require("mongoose")
const url="mongodb://localhost:27017/e-learning"

const connect=async()=>{
    try{
         await mongoose.connect(url)
         console.log("connected successfully")
    }catch{
        console.log("error")
    }
}
module.exports=connect;