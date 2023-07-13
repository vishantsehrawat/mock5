const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
var jwt = require('jsonwebtoken');
var store = require('store')
const userRouter = express.Router();

userRouter.use(express.json())



// signup route 

userRouter.post("/signup",async(req,res)=>{

    const userData = req.body
    try {
        bcrypt.hash(userData.password, 4).then(async function(hash) {
            // Store hash in your password DB.
            userData.password = hash;
            const user = await UserModel(userData)
            user.save();
        });
        // console.log(userData)
        res.status(200).send({msg:"user registered"})
    } catch (error) {
        console.log(error.message)
    }
})

//user login

userRouter.post("/login",async(req,res)=>{

    const userData = req.body
    try {
        const savedUser = await UserModel.findOne({email:userData.email})
        bcrypt.compare(userData.password, savedUser.password).then(function(result) {
            // result == true
            if(result){
                var token = jwt.sign({ userData: userData.email }, process.env.TOKEN_SECRET);
                store.set('usertoken', {token:token}) // for storing in local storage
                res.status(200).send({msg:"user logged in",token:token})
            }
            else{
                res.status(400).send({msg : "Invalid Credentials"})
            }
        });
        
        // res.status(200).send({msg:"user logged in "})
    } catch (error) {
        console.log(error.message)
    }
})



module.exports ={
    userRouter
}