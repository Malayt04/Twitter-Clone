exports.requireLogin=(req,res,next)=>{
    if(req.session && req.session.newUser){
        return next();
    }
    else{
        return res.redirect('/auth/login');
    }
}

