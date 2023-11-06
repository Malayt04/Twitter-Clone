const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router(); 
const User=require('../schema/user');





router.route('/login').get((req,res,next)=>{
res.status(200).render('login');
}).post( async (req, res) => {
    const {username, password} = req.body

    try {
        const newUser = await User.findOne({ username})


        if(newUser)
        {
            const validity = await bcrypt.compare(password, newUser.password)


            if(validity){
                req.session.newUser = newUser;
                return  res.redirect('/')
                }
            
            else{ 
                res.status(400).json("Wrong Password")
            }
        }
        else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.route('/register').get((req,res,next)=>{
    res.status(200).render('register');
    }).post(async(req,res,next)=>{
      
        const {firstName, lastName,username,password,email}=req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password:hashedPass,
            firstName,
            lastName,
            email
          });

        try{
            await newUser.save();
            req.session.newUser = newUser;
            return res.redirect('/');
        }catch(error){
               res.status(500).json({message:error.message});
        }

       })

       router.route('/logout').get((req,res,next)=>{
        if(req.session){
            req.session.destroy(()=>{
                    res.redirect('/auth/login');
            })
        }
       })
      




module.exports=router;


