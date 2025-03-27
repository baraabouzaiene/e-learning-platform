const multer = require ("multer")
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./storage")
    },
    filename:function (req,file,cb){
        const uniqueName = Date.now()+"-"+file.originalname
        cb(null,uniqueName)
    }
})
//filtrage
const upload = multer ({
    storage:storage,
    fileFilter:(req,file,cb)=> {
        if (file.mimetype==="image/png"||file.mimetype==="image/jpeg"||file.mimetype==="image/jpg")
        {
            cb(null,true)
        }
        else {
            cb(new error ("fiche un compatible"))
        }    }
})
module.exports = upload
