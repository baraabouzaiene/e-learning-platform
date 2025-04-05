const formateurController= require('../Controllers/formateurController');
const Formation=require("../Models/formationModel")
const route =require("express").Router()

const upload=require("../middleware/upload")

// step 2:
const checkRole=require("../middleware/checkRole") 
route.put("/updateFormation/:id", checkRole(["Formateur", "Admin"]), async (req, res) => {
    try {
        const formation = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(formation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.post("/addformateur",upload.single("image"),formateurController.createFormateur)
route.get("/getformateur",formateurController.getFormateur)
route.get("/getformateurById/:id",formateurController.getFormateurById)
route.put("/updateformateur/:id",upload.single("image"),formateurController.updateFormateur)
route.delete("/deleteformateur/:id",formateurController.deleteFormateur)


module.exports=route

