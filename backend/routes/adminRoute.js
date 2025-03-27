const adminController= require('../Controllers/adminController');
const route =require("express").Router()


route.post("/addAdmin",adminController.createAdmin)
route.get("/getAdmin",adminController.getAdmin)
route.get("/getAdminById/:id",adminController.getAdminById)
route.put("/updateAdmin/:id",adminController.updateAdmin)
route.delete("/deleteAdmin/:id",adminController.deleteAdmin)


module.exports=route


