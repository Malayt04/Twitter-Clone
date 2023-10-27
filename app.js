const express=require('express');
const app=express();
const dotenv=require('dotenv');
const middleware=require('./middlewares/middleware');
const authRoutes=require('./Routes/authRoutes');

dotenv.config();
app.set('view engine', 'pug');
app.set('views','views');


app.use('/auth', authRoutes);

app.get('/',middleware.requireLogin,(req,res,next)=>{
    var payload={
        pageTitle:"Home"
    }
    res.status(200).render("home", payload);
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})