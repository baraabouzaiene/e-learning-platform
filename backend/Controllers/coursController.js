const { get } = require('http')
const coursSchema =require('../Models/coursModel')
const formationschema=require("../Models/formationModel")

module.exports={

    createCours: async (req, res) => {
        try {
            // ensure that the request has a formationId provided
            const { formationId } = req.body;
            
            // alternative: use route parameter instead of body
            // const { formationId } = req.params;
            //route example: route.post("/addCours/:formationId", upload.array('Image'), coursController.createCours);
    
            if (!formationId) {
                return res.status(400).json({
                    success: false,
                    message: "Formation ID is required to create a cours",
                    data: null
                });
            }
    
            // check if the formation with the given ID exists
            const formation = await formationschema.findById(formationId);
            if (!formation) {
                return res.status(404).json({
                    success: false,
                    message: "Formation with this ID does not exist",
                    data: null
                });
            }
    
            // process uploaded files: req.files is an array of uploaded files (from multer)
            // if no files were uploaded, set gallery as an empty array
            req.body["gallery"] = req.files.length > 0 
                ? req.files.map(file => ({ Image: file.filename })) 
                : [];
    
            // explication:
            // - `.map(obj => func)`: Transforms an array by applying a function to each element.
            // - `=> ({ obj: key })`: Creates a new object for each element in the array.
    
            // create and save the new cours
            const cours = new coursSchema(req.body);
            await cours.save();
    
            // add cours to the corresponding formation
            formation.Courses.push(cours._id); // MongoDB assigns _id to each cours
            await formation.save();
    
            res.status(200).json({
                success: true,
                message: "Cours créé et lié à la formation",
                data: cours
            });
    
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Création du cours échouée: " + error.message,
                data: null
            });
        }
    },
    

    getCours: async (req, res) => {
        try {
            // Finds all cours in coursSchema and replaces formationId with the full formation document
            const cours = await coursSchema.find().populate("formationId");
    
            // Test populate first to ensure formationId is valid
            // if (cours.formationId && cours.formationId.name)
            
            const groupedCours = {};
    
            cours.forEach((cours) => {
                const formationName = cours.formationId?.name; // Using optional chaining to avoid errors if formationId is missing
                
                if (!formationName) return; // Skip if formationName is undefined
    
                if (!groupedCours[formationName]) {
                    groupedCours[formationName] = [];
                }
                groupedCours[formationName].push(cours);
            });
    
            res.status(200).json({
                success: true,
                message: "Cours trouvé",
                // Prevents sending null, which can cause API/frontend issues
                data: Object.keys(groupedCours).length ? groupedCours : {}
            });
    
            // Notes:
            // - Object.keys(groupedCours) returns an array of all keys in the object.
            // - If groupedCours is empty, Object.keys(groupedCours).length returns 0 (false), 
            //   so an empty object {} is returned instead.
            // - .length always returns a number, and in JavaScript, 0 is considered false while any non-zero number is true.
    
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Cours non trouvé: " + error.message,
                data: null
            });
        }
    },
    

    updateCours: async (req, res) => {
        try {
            // Update the cours details
            const cours = await coursSchema.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            );
    
            if (!cours) {
                return res.status(404).json({
                    success: false,
                    message: "Cours with this ID not found :("
                });
            }
    
            // If formationId is being updated, handle the formation change
            if (req.body.formationId && req.body.formationId !== cours.formationId.toString()) {
                // Remove cours from the old formation
                await formationschema.findByIdAndUpdate(
                    cours.formationId,
                    { $pull: { Courses: cours._id } }
                );
    
                // Add cours to the new formation
                await formationschema.findByIdAndUpdate(
                    req.body.formationId,
                    { $push: { Courses: cours._id } }
                );
    
                // Update cours with the new formationId
                cours.formationId = req.body.formationId;
                await cours.save();
            }
    
            res.status(200).json({
                success: true,
                message: "Cours updated successfully",
                data: cours
            });
    
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Update failed: " + error.message
            });
        }
    },
    

    getCoursById: async(req,res)=>{
        try{
            const cours=await coursSchema.findById(req.params.id);
                    if(! cours){
                        return res.status(404).json({
                            message:"cours with this id  not found :(",
                            success:false
                        })
                    }
                    res.status(200).json({
                        message:" cours reetrievied avec succes",
                        data:cours,
                     success:true
                    });
                }
                catch(error){
                    res.status(400).json({
                        success:false,
                        message:"probleme en recuperation de la cours"+error.message
        
                    })
                }
        


    },
    deleteCours: async (req, res) => {
        try {
            const { coursId } = req.params; // Get coursId from URL parameters
            const cours = await coursSchema.findById(coursId); 
    
            if (!cours) {
                return res.status(404).json({ success: false, message: "Cours not found" });
            }
    
            // Remove cours reference from its associated formation
            await formationschema.findByIdAndUpdate(
                cours.formationId, // Directly use the stored formationId,  populate doesn't work with findByIdAndUpdate
                { $pull: { Courses: coursId } } // Ensure "courses" matches the array field name in formationSchema
            );// $pull is used to remove an item from an array
    
            // Delete the cours itself
            await coursSchema.findByIdAndDelete(coursId);
    
            res.status(200).json({ success: true, message: "Cours deleted successfully", cours });
    
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Deleting the cours failed! " + error.message
            });
        }
    },
    

}