const formateurController= require('../Controllers/formateurController');
const route =require("express").Router()

const upload=require("../middleware/upload")

route.post("/addformateur",upload.single("image"),formateurController.createFormateur)
route.get("/getformateur",formateurController.getFormateur)
route.get("/getformateurById/:id",formateurController.getFormateurById)
route.put("/updateformateur/:id",upload.single("image"),formateurController.updateFormateur)
route.delete("/deleteformateur/:id",formateurController.deleteFormateur)


module.exports=route

