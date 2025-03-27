const coursController= require('../Controllers/coursController');
const route =require("express").Router()
const upload=require("../middleware/upload")

route.post("/addCours",upload.array("Image"),coursController.createCours)
route.get("/getCours",coursController.getCours)
route.get("/getCoursById/:id",coursController.getCoursById)
route.put("/updateCours/:id",coursController.gupdateCours)
route.delete("/deleteCours/:id",coursController.deleteCours)


module.exports=route

