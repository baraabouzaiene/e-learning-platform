// bsh nedi lil model sna3neh fil model
const formationschema=require("../Models/formationModel")
const coursSchema=require("../Models/coursModel")

module.exports={
    createFormation: async(req,res)=>{
        try{
            const formation =await formationschema(req.body)
            await formation.save()
            res.status(200).json({
                success:true,
                message: "formation est créee",
                data:formation
            })
        }catch(error){
            res.status(400).json({
                success:false,
                message:"formation pas crée"+error.message,
                data:null
            })
        }
},
    getFormation: async(req ,res)=>{
        try{
            const formation =await formationschema.find();
            res.status(200).json({
                success:true,
                message:"formation est récupérée",
                data:formation
            })}
            catch(error){
                res.status(400).json({
                    success:false,
                    message:"la formation n'était pas récupérée! "+error.message,
                    data:null
                })
            }
        },
    getFormationById: async(req,res)=>{
        try{
            const data=await formationschema.findById(req.params.id);
            if(!data){
                return res.status(404).json({
                    message:"formation witth this id  not found :(",
                    success:false
                })
            }
            res.status(200).json({
                message:" formation reetrievied avec succes",
                data:data,
            success:
        true});
        }
        catch(error){
            res.status(400).json({
                success:false,
                message:"probleme en recuperation de la formation"+error.message

            })
        }
    },
    updateFormation: async(req, res) => // est ce  que yhem il tartib a req w res ?
    {
        try {
            const formation = await formationschema.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            )
            if (!formation) {
                return res.status(404).json({
                    success: false,
                    message: "Formation with this id not found :( "
                })
            }
            res.status(200).json(formation)
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "formation not found " + error.message
            })
        }
    },
    

    deleteFormation:async (req, res) => {
        try {
            const data = await formationschema.findByIdAndDelete(req.params.id);
            if (!data) {
                return res.status(404).json({ success:true,message: "Formation not found" });
            }
            res.status(200).json({ success:true,message: "Formation deleted successfully", data });
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"deleting the formation failed!"+error.message
            });
        }
    },/*
    getCoursInFormation: async(req,res)=>{
        try{
            const cours=await coursSchema.find().populate("formationId");
            res.status(200).json({
                success:true,
                message:"cours est récupérée",
                data:cours
            })}
            catch(error){
                res.status(400).json({
                    success:false,
                    message:"les cours de cette  formation n'était pas récupérée! "+error.message,
                    data:null
                })
            }
        
        }*/
    }
   
