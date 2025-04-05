const adminController= require('../Controllers/adminController');
const etudiantController = require('../Controllers/etudiantController');
const route =require("express").Router()
// Role based access control
// step2: protect routes
const checkRole =require("../middleware/checkRole");
const etudiantModel = require('../Models/etudiantModel');
 

route.post("/addetudiant",checkRole(["Admin"]),etudiantController.createEtudiant,async(req,res)=>{

// old one: route.post("/addetudiant",etudiantController,checkRole(["Admin"]),async(req,res)=>{
// mistake : etudiantController is not a middleware,so it shouldn't be placed before checkRole()
    try{
        const etudiant=new etudiantModel(req.body);
        await etudiant.save();
        res.status(201).json(etudiant);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

route.post("/addAdmin",adminController.createAdmin)
route.get("/getAdmin",adminController.getAdmin)
route.get("/getAdminById/:id",adminController.getAdminById)
route.put("/updateAdmin/:id",adminController.updateAdmin)
route.delete("/deleteAdmin/:id",adminController.deleteAdmin)


module.exports=route


