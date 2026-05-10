const express=require('express')
const router=express.Router();
const {registerController,loginController,getMeController,logoutController}=require('../controllers/user.controller')
const authMiddleware=require('../middleware/auth.middleware')


router.post('/register',registerController)

router.post('/login',loginController)

router.get('/me',authMiddleware,getMeController)

router.post('/logout',authMiddleware,logoutController)
module.exports=router