const etudiantController= require('../Controllers/etudiantController');
const route =require("express").Router()
const upload=require("../middleware/upload")


route.post("/addetudiant",upload.single("image"),etudiantController.createEtudiant)
route.get("/getetudiant",etudiantController.getEtudiant)
route.get("/getetudiantById/:id",etudiantController.getEtudiantById)
route.put("/updateetudiant/:id",upload.single("image"),etudiantController.updateEtudiant)
route.delete("/deleteetudiant/:id",etudiantController.deleteEtudiant)


module.exports=route

