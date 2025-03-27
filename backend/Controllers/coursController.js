const { get } = require('http')
const coursSchema =require('../Models/coursModel')

module.exports={

    createCours: async(req,res)=>{
        try{
            req.body["gallery"] = req.files.length <= 0 ? [] 
        : req.files.map((file) => ({ Image: file.filename }));
             const cours=await coursSchema(req.body)
            await cours.save()
            res.status(200).json({
                success:true,
                message: "cours est créee",
                data: cours
            })
        }
        catch(error){
            res.status(400).json({
                success:false,
                message: "cours pas créee"+error.message,
                data: null
            })
        }
       

    },


    getCours: async(req,res)=>{
        try{
            const cours = await coursSchema.find();
            res.status(200).json({
                success:true,
                message: "cours est trouvé",
                data: cours
            })
        }catch(error){
            res.status(400).json({
                
                success:true,
                message: "cours n'est  pas trouvé"+error.message,
                data: null
                

            })

        }
    },

    gupdateCours: async(req,res)=>{
      try {
        
        
          const cours = await coursSchema.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
                    )
            if (!cours) {
                return res.status(404).json({
                        success: false,
                        message: "Cours with this id not found :( "
                        })
                    }
                    res.status(200).json(cours)
                } catch (error) {
                    res.status(400).json({
                        success: false,
                        message: "cours not found " + error.message
                    })
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
    deleteCours: async(req,res)=>{
try {
            const cours = await coursSchema.findByIdAndDelete(req.params.id);
            if (! cours) {
                return res.status(404).json({ success:true,message: "cours not found" });
            }
            res.status(200).json({ success:true,message: "cours deleted successfully", cours });
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"deleting the cours failed!"+error.message
            });
        }
    }

}