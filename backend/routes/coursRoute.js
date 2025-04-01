const coursController= require('../Controllers/coursController');
const route =require("express").Router()
const upload=require("../middleware/upload")

route.post("/addCours",upload.array("Image"),coursController.createCours)// upload.array("image") tells multer to  expect multiple files under field name Image, stores them temporally before parcing
route.get("/getCours",coursController.getCours)
route.get("/getCoursById/:id",coursController.getCoursById)
route.put("/updateCours/:id",coursController.gupdateCours)
route.delete("/deleteCours/:id",coursController.deleteCours)


module.exports=route

