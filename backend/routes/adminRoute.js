const adminController= require('../Controllers/adminController');
const etudiantController = require('../Controllers/etudiantController');
const route =require("express").Router()
// Role based access control
// step2: protect routes
const {verifyToken ,checkRole}=require("../middleware/auth"); 
 

route.post("/addetudiant",verifyToken,checkRole(["Admin"]),etudiantController.createEtudiant);

route.post("/addAdmin",adminController.createAdmin)
route.get("/getAdmin",adminController.getAdmin)
route.get("/getAdminById/:id",adminController.getAdminById)
route.put("/updateAdmin/:id",adminController.updateAdmin)
route.delete("/deleteAdmin/:id",adminController.deleteAdmin)


module.exports=route


