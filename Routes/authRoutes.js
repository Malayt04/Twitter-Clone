const express=require('express');
const router=express.Router(); 



router.route('/login').get((req,res,next)=>{
res.status(200).render('login');
})

module.exports=router;