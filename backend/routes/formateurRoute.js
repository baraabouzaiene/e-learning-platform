const formateurController= require('../Controllers/formateurController');
const Formation=require("../Models/formationModel")
const coursController= require('../Controllers/coursController');
const formationController = require('../Controllers/formationController');


const route =require("express").Router()

const upload=require("../middleware/upload")

// step 2:
const checkRole=require("../middleware/checkRole"); 
route.put("/updateFormation/:id", checkRole(["Formateur", "Admin"]),formationController.updateFormation);


route.post("/addCours",checkRole(["Formateur","Admin"]),upload.array("Image"),coursController.createCours);
// upload.array("image") tells multer to  expect multiple files under field name Image, stores them temporally before parcing
route.get("/getCours",checkRole(["Admin","Formateur"]),coursController.getCours)
route.get("/getCoursById/:id",checkRole(["Admin","Formateur"]),coursController.getCoursById)
route.put("/updateCours/:id",checkRole(["Admin","Formateur"]),coursController.gupdateCours)
route.delete("/deleteCours/:id",checkRole(["Admin","Formateur"]),coursController.deleteCours)


 

module.exports=route

