const formationController=require("../Controllers/formationController")
const route =require("express").Router()
route.post("/addFormation",formationController.createFormation)


route.get('/getFormation',formationController.getFormation)
route.get('/getFormationById/:id',formationController.getFormationById)
route.put('/updateFormation/:id',formationController.updateFormation)
route.delete('/deleteFormation/:id',formationController.deleteFormation)
module.exports=route