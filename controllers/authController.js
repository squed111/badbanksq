const User = require("../models/userModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, id } = req.body;
    if (!username){
      res.json({ message: "Name is required"});
    }
    if(!email){
      res.json({message: "Email is required"});
    }
    if(password.length <= 7){
      res.json({ message: "Password must be at least 8 characters"});
    }
    if(!password){
      res.json({message: "Password is required!"});
    }
    const user = await User.create({ email, password, username, id });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: `Welcome, ${user.username}`, success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'Please Enter Email and Password'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect Email' }) 
      }
      const auth = await bcrypt.compare(password, user.password)
      if (!auth) {
        return res.json({message:'Incorrect Password' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
         res.status(201).json({ message: `Welcome back, ${user.username}`, success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }


  module.exports.findOne = (req, res) => {
    try{
    const email = req.params.email;
    const user = User.findOne({ email });
    if(!user){
      return res.json({message:'There is no user with that email' }) 
      }
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
        res.status(201).json({ message: 'success', success: true });
      next()
   } catch (error) {
     console.error(error);
   }
  };
  
module.exports.update = (req, res) => {
  try{
    const { email, balance } = req.params;
    const user = User.findOne({ email });
    if (!token){
      return res.json({ message: 'Please sign in as valid user'})
    }   
      User.updateOne(
        {"email": email},
        {$inc: {"balance": balance}});
      return res.status(201).json({ message: `${user.userName}: $${user.balance}`, success: true });
      next()
    } catch (error) {
      console.error(error);  
  }
}
