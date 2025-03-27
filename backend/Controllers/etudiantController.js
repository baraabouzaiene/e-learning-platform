const etudiantModel = require('../Models/etudiantModel');
const etudiantSchema=require('../Models/etudiantModel');
const {randomBytes}=require("crypto");// {}5aterha fonction mil crypto
const generateCode=randomBytes(6).toString("hex");//ye5ouli 6 byte au hazard w y7awelhom hexa
const nodemailer = require("nodemailer");


module.exports={

  createEtudiant:async(req,res) =>{
        try {
                if (req.file) {
                req.body.image = req.file.filename}

                const f=await etudiantSchema({...req.body, code:generateCode});//wa9t bsh tsavili data  a3ml modification: zid code generitou lil body
                const saivedF =await f.save();
            

            res.status(200).json({
                success : true,
                message : " etudiant a étè crée avec succés",
                data : saivedF
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
     to: saivedF.email,
     subject: 'Hello '+" "+saivedF.name,
     text: 'mail de confirmation',
     html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                   
                    <title>Document</title>
                </head>
                <body>
                    <h1>verify account</h1>
                    <a href ="http://localhost:5000/user/verify/${saivedF.code}"> click here </a>                </body>
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
 
        } catch (error) {
            res.status(400).json({
                success: false,
                message:"le etudiant n'était pas cré",
                data : null
            })          
        }
    },

    getEtudiant :async(req,res)=>{
        try {
            const etudiant= await etudiantSchema.find();
            res.status(200).json({
                success : true,
                message :"etudiant found with success",
                data : etudiant
            })

        } catch (error) {
            res.status(400).json({
                success:false,
                message: "etudiant was not found",
            data:null            })
            
        }
    },
    getEtudiantById: async(req,res,)=>{
        try {
            const etudiant=await etudiantSchema.findById(req.params.id);
            if (!etudiant){
                res.status(404).json({
                    success: false,
                    message: "this id of etudiant was not found",
                    data: null
                })

            }
            res.status(200).json({
                success: true,
                message: "etudiant was found",
                data: etudiant
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: "echec de recherche d'etudiant"+ error.message,
                data: null
            })
            
        }
    },

    updateEtudiant:async(req,res)=>{
        try{
//if (req.file) {
          //  req.body.image = req.file.filename;}
          
           // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
                data: null,
            });
        }

          // 1 find the exsitng etudiant
          const existingE = await etudiantModel.findById(req.params.id);
          if (!existingE) {
              return res.status(404).json({
                  success: false,
                  message: "etudiant not found",
                  data: null
              });
          }
             // Ne met à jour l'image que si une nouvelle image est envoyée
             if (req.file) {
              req.body.image = req.file.filename;
          } else {
              req.body.image = existingE.image; // Conserver l'ancienne image
  
  
          }
  
           // Sanitize and update the student
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            // Include only allowed fields
        };



            const etudiant=await etudiantSchema.findByIdAndUpdate(
            req.params.id ,
            //{ $set: req.body },
            //This is a MongoDB update operator ($set).
            //It takes all the fields from req.body (which contains the new data sent in the request) and updates only those fields in the database.
            //If a field exists in req.body, it updates its value; if it doesn’t exist, it remains unchanged.
            { $set: updateData },

            { new: true, runValidators: true })//hese are options for findByIdAndUpdate:
            //new: true: Returns the updated document instead of the old one.
            //runValidators: true: Ensures that the update follows the validation rules defined in the schema.
            
            // handle update result
            if(!etudiant){
                res.status(404).json({
                    success: false,
                    message: "etudiant with this id not found :( "
                    })
                }
                res.status(200).json(etudiant)
            }
            // error handling 
             catch (error) {
                res.status(400).json({
                    success: false,
                    message: "etudiant not found " + error.message
                })
            }
            // we handled the image update seperatly here  for 4 main reasosn:
            // 1: if used directly findByIdAndUpdate without the conditional logic 
            // might  unintentionammy overwrite the image with null or undefined
            // 2: usually the logic handling file upload is seperate from the general update function
            // this makes the code more readable and maintainable especially when dealing with file storage systems(local sorage ,cloud storage)

            // vulnerability ; sql-injection
            //  mongoDB is a NoSQL database , so it's not vulerable to sql injection
            //however it could be vulnerable to NoSQL injection if user input is not propermly
            // validated and sanitized
            // 1: if req.params.id or req.body contain malicious input  => NoSQL injection
            // example of maicious input in req.params.id :
            // malicous  input(not validated):
            // req.params.id= {$ne: null}
            // this query would bypass the intended check for a specific  ID  and update the first document in the collection where _id is not null
            // example of malicious input: in req.body: ( req.body not sanitized)
            //{ "name": "John",
            // "$set": {"role": "admin"}}
            // this would  allow the attacker to escalate  priveleges by injecting addtional fields in the $set operator
            },
    deleteEtudiant:async(req,res)=>{
                try {
                    const etudiant=await etudiantSchema.findByIdAndDelete(req.params.id);
                    if (! etudiant) {
                        return res.status(404).json({ success:true,message: "etudiant not found" });
                    }
                    res.status(200).json({ success:true,message: "etudiant deleted successfully", etudiant });
                } catch (error) {
                    res.status(400).json({
                        success:false,
                        message:"deleting the etudiant failed!"+error.message
                    });
                }
        
                
            }
  }
        
    


