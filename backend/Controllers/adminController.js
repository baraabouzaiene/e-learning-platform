const adminSchema = require("../Models/adminModel");
const {randomBytes}=require("crypto");// {}5aterha fonction mil crypto
//3 generate randoù code
const generateCode=randomBytes(6).toString("hex");//ye5ouli 6 byte au hazard w y7awelhom hexa
const nodemailer = require("nodemailer");

module.exports={

createAdmin: async (req, res) => {
    try {
        //1 extract email from req.body
        const { email } = req.body;
        //2 check if admin already exists
        const existingAdmin = await adminSchema.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists with this email",
                data: null,
            });
        }
        // 4 create and save the admin
        const admin = new adminSchema({ ...req.body, code:generateCode });
        const savedAdmin = await admin.save();

        // 5 Configurer le transporteur d'email
        //An email transporter is configured using the nodemailer library.
        //  In this case, the configuration uses Mailtrap's SMTP server for testing purposes.
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "5eb65c03cb943e",
                pass: "0d8fa1526d3e9d",
            },
        });

        // 6 Envoyer l'email de confirmation de compte
        await transport.sendMail({
            from: "admin@gmail.com",
            to: savedAdmin.email,
            subject: "Hello " + savedAdmin.name,
            text: "Mail de confirmation",
            html: `
                <!DOCTYPE html>
                <html lang="eng"> 
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verify Account</title>
             </head>
      
            <body>
            <h1>Verify your account</h1>
            <a href="http://localhost:3000/user/verify/${savedAdmin.code}">Click here</a>
             </body>
                </html>
            `,
        });

        //7 Envoyer la réponse de succes uniquement après l'email
        return res.status(200).json({
            success: true,
            message: "Created successfully",
            data: savedAdmin,
        });

    } catch (error) {
        console.error("Erreur lors de la création de l'administrateur :", error);
        return res.status(400).json({
            success: false,
            message: "Creation failed",
            data: null,
        });
    }
},


getAdmin: async(req,res)=>{
    try {
        const Admin= await adminSchema.find();
        res.status(200).json({
            success:true,
            message: 'Admin est trouvé ',
            data:Admin
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Admin was not found :( '+error.message,
            data:null
        })
    }
},
getAdminById:async(req,res)=>{
    try {
        const Admin=await adminSchema.findById(req.params.id)
        if(!Admin){
            res.status(404).json( {
                success:false,
            message:'Admin  with this id was not found :( ',
            data:null
            })
        }else{
            res.status(200).json({
                success:true,
                message:" admin was found",
                data:Admin
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Admin was not found :( '+error.message,
            data:null
    })
}

},

updateAdmin:async(req,res)=>{
    try {

        const adminById = req.params.id
        const Admin= await adminSchema.findByIdAndUpdate(
        adminById,
         req.body ,
        { new: true})
          res.status(200).json({
              success:true,
              message:"update successful",
              data:Admin
          })

        }
    catch (error) {

 res.status(400).json({
    success: false,
    message: "admin not updated " + error.message,
    data:null})
        
}},
deleteAdmin:async(req,res)=>{
    try{
      const deleteAdmin = req.params.id
      const existingAdmin = await adminSchema.findById(deleteAdmin);

      if (!existingAdmin) {
            return res.status(404).json({
              success: false,
              message: "Admin not found", 
              data: null,
            });
          }

    const admin=await adminSchema.findByIdAndDelete(deleteAdmin);

    if(!admin){
        res.status(404).json( {
            success:false,
        message:'Admin  with this id was not found :( ',
        data:null
        })
    }else{
        res.status(200).json({
            success:true,
            message:" admin was found and deleted",
            data:admin
        })
}
    }
catch (error) {

res.status(400).json({
success: false,
message: "admin not deleted " + error.message,
data:null})
    
}
}

}
