const express = require("express");
// const mongoose = require("mongoose")
const connect = require("./configs/db");
const userController = require("./controllers/user.controller")
const productController = require("./controllers/product.controller")



const {register,login,generateToken} = require("./controllers/auth.controller")
const app = express();

app.use(express.json());
const passport = require("./configs/google-oauth");

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false } ),
  function(req, res) {
    const token = generateToken(req.user)
    return res.status(200).send({user:req.user,token})
    // Successful authentication, redirect home.

  });


app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.use("/products", productController)

app.listen(5000, async () => {
    try{
        await connect();
        console.log("listening on port 5000")
    }
    catch(err){
        console.log(err.message);
    }
});
