const formateurSchema =require('../Models/formateurModel')
const nodemailer=require("nodemailer");
const {randomBytes}=require("crypto");// {}5aterha fonction mil crypto
const generateCode=randomBytes(6).toString("hex");//ye5ouli 6 byte au hazard w y7awelhom hexa

module.exports={

    createFormateur: async(req,res)=>{
        try{
            if (req.file) {
                req.body.image = req.file.filename}
             const formateur=await formateurSchema({...req.body, code:generateCode});//wa9t bsh tsavili data  a3ml modification: zid code generitou lil body
             const saivedFormateur =await formateur.save();

            
            await formateur.save()
            res.status(200).json({
                success:true,
                message: "formateur est créee",
                data: formateur
            })
        // Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false, // use SSL
      auth: {
              user : '5eb65c03cb943e',
            pass : '0d8fa1526d3e9d'
            }
  });
  // Configure the mailoptions object
const mailOptions = {
    from: 'yourusername@email.com',
    to: saivedFormateur.email,
    subject: 'Hello '+" "+saivedFormateur.name,
    text: 'mail de confirmation',
    html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                   
                    <title>Document</title>
                </head>
                <body>
                    <h1>verify account</h1>
                    <a href ="http://localhost:5000/user/verify/${saivedFormateur.code}"> click here </a>                </body>
                </html>`
  };
  // Send the email
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
        
        }catch(error){
            res.status(400).json({
                success:false,
                message: "formateur pas créee"+error.message,
                data: null
            })
        }
       

    },


    getFormateur: async(req,res)=>{
        try{
            const formateur = await formateurSchema.find();
            res.status(200).json({
                success:true,
                message: "formateur est trouvé",
                data: formateur
            })
        }catch(error){
            res.status(400).json({
                
                success:true,
                message: "formateur n'est  pas trouvé"+error.message,
                data: null
                

            })

        }
    },

    updateFormateur: async(req,res)=>{
      try {
        //if (req.file) {
          //  req.body.image = req.file.filename;}
            const existingFormateur = await formateurSchema.findById(req.params.id);
        if (!existingFormateur) {
            return res.status(404).json({
                success: false,
                message: "Formateur not found",
                data: null
            });
        }
           // Ne met à jour l'image que si une nouvelle image est envoyée
           if (req.file) {
            req.body.image = req.file.filename;
        } else {
            req.body.image = existingFormateur.image; // Conserver l'ancienne image


        }



        
          const formateur= await formateurSchema.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
                    )
            if (!formateur) {
                return res.status(404).json({
                        success: false,
                        message: "formateur with this id not found :( "
                        })
                    }
                    res.status(200).json(formateur)
                } catch (error) {
                    res.status(400).json({
                        success: false,
                        message: "formateur not found " + error.message
                    })
                }

    },           

    getFormateurById: async(req,res)=>{
        try{
            const formateur=await formateurSchema.findById(req.params.id);
                    if(! formateur){
                        return res.status(404).json({
                            message:"formateur witth this id  not found :(",
                            success:false
                        })
                    }
                    res.status(200).json({
                        message:" formateur reetrievied avec succes",data:formateur,
                     success:true
                    });
                }
                catch(error){
                    res.status(400).json({
                        success:false,
                        message:"probleme en recuperation du formateurs"+error.message
        
                    })
                }
        


    },
    deleteFormateur: async(req,res)=>{
try {
            const formateur = await formateurSchema.findByIdAndDelete(req.params.id);
            if (! formateur) {
                return res.status(404).json({ success:true,message: "formateur not found" });
            }
            res.status(200).json({ success:true,message: "formateur deleted successfully", formateur });
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"deleting the formateur failed!"+error.message
            });
        }
    }

}