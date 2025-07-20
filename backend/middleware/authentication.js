const { status } = require("http-status");
const User = require('../model/UserModel');
const bcrypt = require("bcrypt");
const crypto = require('crypto');


const signUp = async (req, res) => {
  const { username, mobile, password, email } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(status.ALREADY_REPORTED)
      .json({ message: "User already exists", success: false });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 9);
    const newUser = new User({ username, password: hashPassword, mobile, email });
    await newUser.save();

    res
      .status(status.CREATED)
      .json({ message: "Account created", success: true });
  } catch (e) {
    res.status(status.INTERNAL_SERVER_ERROR).json(e);
  }
};

const login = async (req,res)=>{

 if(!req.body){
  return res.status(status.BAD_REQUEST).json({message:"Bad request"})
 }
  const {email , password}=req.body;


  try{
    
  const existUser = await User.findOne({email});
  console.log(email);

  if(!existUser){
    return res
      .status(status.NOT_FOUND)
      .json({message:"Invalid email" , success:false});
  }
 
  if(bcrypt.compare(password , existUser.password)){

    const token = crypto.randomBytes(10).toString('hex');
     const userToken = await User.updateOne({email:email},{$set:{token:token}});
     await userToken.save();
     console.log("ok");

    return res.status(status.CONTINUE).json({message:"Login", success:true,token:token})


  }

  return res.status(status.NOT_FOUND).json({message:"Password is incorrect", success:false})

  }catch(e){

  }


  
}


module.exports = { signUp ,login};
