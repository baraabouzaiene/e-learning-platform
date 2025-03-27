const { verify } = require("crypto")
const userController=require("../Controllers/userController")
const route =require("express").Router()
route.post("/addUser",userController.createUser)

route.get('/verify/:code',userController.verify)
route.get('/getUser',userController.getuser)
route.get('/getUserById/:id',userController.getUserById)
route.put('/updateUser/:id',userController.updateUser)
route.delete('/deleteUser/:id',userController.deleteUser)
route.post('/login',userController.login)
module.exports=route