const userSchema=require("../Models/userModel")
const { join } = require('path');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


// environnement variables
// we wll use them in the login function
const accesskey=process.env.accesstoken // secret key for generating access tokens
const refreshkey=process.env.refreshtoken // secret key for generating refresh tokens


// create a short linving access token for 10 minutes using the users id
const genrateaccesstoken=(user)=>{
    return jwt.sign({
        id:user.id,
        role:user.role // i added this to checkRole
    },
    accesskey,
    {expiresIn:"10m"}
)
}

// generates a long living fresh token that lives 1 hour
const genratefreshtoken=(user)=>{
    return jwt.sign({
        id:user.id,
        role:user.role
    },
    refreshkey,
    {expiresIn:"1h"}
)
}
 // stores refresh token in array temporarily 
const refreshtokens=[]




//3 partie 
// 1 header :type of token +algo
//2: payload:info of user
//3 signature:permet de verifier l'integrité du token 
module.exports={
    //  verify a user using a unique code
    // when a user registeres a unique code is generated and stored in the database
    // the code is sent to the user 's email as verfi link
    //whe the user clicks the link the verfy func checks if the code exists in the db then it removes the code and it sets verify to true
    // my mistake: i thought that code is related to tokens
    verify:async (req, res) => {
        try {

            const verifyCode = await userSchema.findOne({ code: req.params.code });
            if (!verifyCode) {
                return res.sendFile(join(__dirname + "../../template/erreur.html"));
            }      // Mise à jour sans déclencher `pre("save")`
            await userSchema.updateOne(
                { _id: verifyCode._id },
                // removes the code and sets verify to true
                { $unset: { code: "" }, $set: { verify: true } }
            );        return res.sendFile(join(__dirname + "../../template/success.html"));
        } 
        catch (err) { 
                 return res.sendFile(join(__dirname + "../../template/erreur.html"));
        }
    },
    createUser:async(req,res)=>{
        try{ 
        const user= await userSchema(req.body);
        await user.save()
                    res.status(200).json({
                        success:true,
                        message: "user est créee",
                        data:formation
                    })
                }catch(error){
                    res.status(400).json({
                        success:false,
                        message:"user pas crée"+error.message,
                        data:null
                    })
                }
        },
            
        
    getuser: async(req ,res)=>{
        try{
            const user =await userSchema.find();
            res.status(200).json({
                success:true,
                message:"usern est récupérée",
                data:formation
                    })}
        catch(error){
            res.status(400).json({
                success:false,
                message:"le user n'était pas récupérée! "+error.message,
                data:null
                        })
                    }
                },
    getUserById: async(req,res)=>{
        try{
            const data=await userSchema.findById(req.params.id);
            if(!data){
                return res.status(404).json({
                    message:"user witth this id  not found :(",
                    success:false
                        })
                    }
                res.status(200).json({
                    message:" user reetrievied avec succes"+data,
                    success:
                true});
                }
        catch(error){
                res.status(400).json({
                    success:false,
                    message:"probleme en recuperation de user"+error.message
        
                    })
                }
            },
    updateUser: async(req, res) => {
        try {
            const user = await userSchema.findByIdAndUpdate(
                req.params.id,
                    { $set: req.body },
                    { new: true, runValidators: true }
                    )
            if (!user) {
                return res.status(404).json({
                    success: false,
                     message: "user with this id not found :( "
                        })
                    }
            res.status(200).json(user)
                } 
        catch (error) {
                    res.status(400).json({
                        success: false,
                        message: "user not found " + error.message
                    })
                }
            },
            
        
    deleteUser:async (req, res) => {
        try {
            const data = await useSchema.findByIdAndDelete(req.params.id);
            if (!data) {
                return res.status(404).json({ success:true,message: "usernot found" });
                    }
            res.status(200).json({ success:true,message: "user deleted successfully", data });
                }
        catch (error) {
            res.status(400).json({
                success:false,
                message:"deleting the user failed!"+error.message
                    });
                }
            },
            

login : async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userSchema.findOne({email})
        if (!user){
            res.status(400).json({
                message:"email doesnt exist"
            })
        }
        else {
        const pass = await bcrypt.compare(password,user.password)
        if (!pass){
            res.status(400).json({
                message:"wrong password"
            })
        }
        else {
            const accessToken = genrateaccesstoken(user)
            const refreshToken = genratefreshtoken(user)
            refreshtokens.push(refreshToken)
            res.status(200).json({
                success:true,
                message:"correct email and password",
                data:user,
                accessToken:accessToken,
                refreshToken:refreshToken            })
        }
        }    }
    catch (err){
        res.status(400).json({
            success:false,
            message:"email wrong or doesnt exist "+err
        })
    }
},
        }




