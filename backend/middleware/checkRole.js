//  Role -bases access control
// step 1 : add Role-Based middleware


const checkRole=(roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.itemType)){
          return res.status(403).json({message:"Access denied"}) ;

        }
        next();

    };
};

module.exports=checkRole;