const express=require('express');
const app=express();
const dotenv=require('dotenv');
const middleware=require('./middlewares/middleware');
const authRoutes=require('./Routes/authRoutes');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');

dotenv.config();
app.set('view engine', 'pug');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"bbq chips",
  resave: true,
  saveUninitialized: false
}))



app.use('/auth', authRoutes);

app.get('/',middleware.requireLogin,(req,res,next)=>{
    var payload={
        pageTitle:"Home",
        userLoggedIn:req.session.newUser
    }
    res.status(200).render("home", payload);
})




mongoose.connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));