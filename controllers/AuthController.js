const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Otp = require('../models/otp')
const config = require("../config/auth.config")


// const verifyToken = (req, res, next) => {
//     let token = req.body["token"];
//     console.log(token)
//     if (!token) {
//       return res.status(403).send({ message: "No token provided!" });
//     }
//     jwt.verify(token, config.secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).send({ message:"Unauthorized!"});
//       }
//       req.userId = decoded.id;
//       next(); 
//     });
//   };


// const register = async (req, res, next) => {
//     try {
//         let exitUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
//         if (exitUser) {
//             res.status(400).json({
//                 status: 400,
//                 message: 'user already exist'
//             })
//         } else {
//             bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
//                 if (err) {
//                     res.json({
//                         error: err
//                     })
//                 }
//                 let user = new User({
//                     name: req.body.name,
//                     email: req.body.email,
//                     phone: req.body.phone,
//                     password: hashedPass
//                 })
//                 await user.save()
//                 res.json({
//                     message: 'User added successfully',
//                     data: user
//                 })
//             })
//         }

//     }
//     catch (error) {
//         res.status(400).json({
//             message: error.message
//         })
//     }
// }

// const login = (req, res, next) => {
//         var username = req.body.username
//         var password = req.body.password

//         User.findOne({$or: [{ email:username }, { phone:username }]})
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(password, user.password, function(err, result) {
//                     if (err) {
//                         res.json({
//                             error: err
//                         })
//                     }
//                     if (result){
//                         let token = jwt.sign({id:user.id}, config.secret, {expiresIn: '2d'})
//                         res.json({
//                             message: 'login successful',
//                             token
//                         })
//                     } else {
//                         res.json({
//                             message: 'password does not match'
//                         })
//                     }
//                 })
//             } else {
//                 res.json({
//                     message: 'no user found'
//                 })
//             }
//         })
// }

// // const verifyToken = (req, res, next) => {
// //     let token = req.body["token"];
// //     if (!token) {
// //       return res.status(401).send({ message: "No token provided!" });
// //     }
// //     jwt.verify(token, config.secret, (err, decoded) => {
// //       if (err) {
// //         return res.status(401).send({ message:"Unauthorized!"});
// //       }
// //       req.userId = decoded.id;
// //       next(); 
// //     });
// //   };

// const forgotPassword = async (req,res) => {
//     try{
//         const email = req.body.email
//         const user = await User.findOne({email})
//         if (user) {
//             const token = jwt.sign({email:user.email},process.env.RESET_PASSWORD_KEY, {expiresIn:'2d'})
//             const data = await User.updateOne({email:email},{resetLink:token})
//             sendResetPasswordMail(user.name,user.email,token)
//             res.status(200).send({success:true,msg:"please check your email "})
//         }     
//         else{
//             res.status(400).send({error:"User with this email not found"})
//         }
//     }catch (error){
//         res.status(400).send({success:false,msg:error.message})
//     }
// }

// // const resetPassword = async (userId, token, password) => {
// //     let passwordResetToken = await Token.findOne({ userId });
// //     if (!passwordResetToken) {
// //       throw new Error("Invalid or expired password reset token");
// //     }
// //     const isValid = await bcrypt.compare(token, passwordResetToken.token);
// //     if (!isValid) {
// //       throw new Error("Invalid or expired password reset token");
// //     }
// //     const hash = await bcrypt.hash(password, Number(bcryptSalt));
// //     await User.updateOne(
// //       { _id: userId },
// //       { $set: { password: hash } },
// //       { new: true }
// //     );
// //     const user = await User.findById({ _id: userId });
// //     sendEmail(
// //       user.email,
// //       "Password Reset Successfully",
// //       {
// //         name: user.name,
// //       },
// //       "./template/resetPassword.handlebars"
// //     );
// //     await passwordResetToken.deleteOne();
// //     return true;
// //   };

// const sendResetPasswordMail = async (name,email,token) => {
//     try{
//         const transporter = nodemailer.createTransport({
//             host:'smtp.gmail.com',
//             port: 587,
//             service:'gmail',        
//             auth:{
//                 user:process.env.EMAIL_USER,
//                 pass:process.env.EMAIL_PASSWORD
//             }
//         })
//         const mailOptions = {
//             from: process.env.EMAIL_USER, 
//             to:email,
//             subject:'Password reset link',
//             html:`<h2> Reset ur password </h2>
//             <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
//         }
//         transporter.sendMail(mailOptions,function(error,info){
//             if(error){
//                 console.log(error)
//             }
//             else{
//                 console.log("Mail has been sent..",info.response)
//             }
//         })
//     } catch (error) {
//         res.status(400).send({success:false,msg:error.message})
//     }
// }

// const resetPassword= async (req, res) => {
//     if (req.body.password !== req.body.confirmPassword) {
//         return res.status(404).send({
//             message: 'password does not match'
//         })
//     }
//     let id = req.userId
//     const user = await User.findOne({id:id})
//     console.log(user)
//     if (!user) {
//         return res.status(404).send({
//             message: 'user not found'
//         })
//     }
//     let password = {password:await bcrypt.hashSync(req.body.password, 8)}
//    const result = await User.findByIdAndUpdate(user,{$set:password})

//     res.json({
//         message:'success',
//         data:result
// })
// }

// const sendOtp = async(req,res) => {
//     let phone = req.body.phone
//     const user = await User.findOne({
//         phone:phone
//     })
//     if(!user){
//         return res.status(400).send("user not found")
        
//     }
//     const sendOtp = Math.floor(100000+Math.random()*900000)
    
//     const dataresult = new Otp({
//         number:phone,
//         otp:sendOtp
//     })
//     let result = await dataresult.save();
//     return res.status(200).json({
//         message:"otp send successfully",
//         data:result
//     })
// }

// const otpchangePassword = async(req,res) => {
//     try{
//         let {otp,phone} = req.body;

//         let data = await Otp.findOne({otp:otp})
//         if(!data){
//             return res.status(403).json({
//                 message:"Otp not found or Invalid Otp please Try again!!!"
//             })
//         }
//         let passkey = {
//                 password:await bcrypt.hashSync(req.body.password, 8)
//             }
//         let value = await User.findOne({phone:phone})
//         let id = value?.id
//           let result = await User.findByIdAndUpdate(id,{$set:passkey})
//             return res.status(200).json({
//                 message:"password changed successfully",
//                 data:result
//             })
        
//     }catch(error){
//         res.status(400).send({success:false,msg:error.message})
//     }
// }


// module.exports ={
//     register,login,forgotPassword,resetPassword,verifyToken,sendOtp,otpchangePassword
// }


const verifyToken = (req, res, next) => {
       let token = req.headers["x-access-token"];
       console.log(token)
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

  const sendResetPasswordMail = async (name,email,token) => {
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587,
            service:'gmail',
            // secure:true,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to:email,
            subject:'Password reset link',
            html:`<h2> Reset ur password </h2>
            <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log("Mail has been sent..",info.response)
            }
        })
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}
const register = async (req, res, next) => {
    try {
        let exitUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        if (exitUser) {
            res.status(400).json({
                status: 400,
                message: 'user already exist'
            })
        } else {
            bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedPass
                })
                await user.save()
                res.json({
                    message: 'User added successfully',
                    data: user
                })
            })
        }

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

User.findOne({ $or: [{ email: username }, { phone: username }] })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result){
                    let token = jwt.sign({id:user.id}, config.secret, {expiresIn: '2h'})
                    res.json({
                        message: 'login successfull',
                        token
                    })
                } else {
                    res.json({
                        message: 'password does not match'
                    })
                }
            })
        } else {
            res.json({
                message: 'no user found'
            })
        }
    })
}
const forgotPassword = async (req,res) => {
    try{
        const email = req.body.email
        const user = await User.findOne({email})
        if (user) {
            const token = jwt.sign({email:user.email},process.env.RESET_PASSWORD_KEY, {expiresIn:'1h'})
            const data = await User.updateOne({email:email},{resetLink:token})
            sendResetPasswordMail(user.name,user.email,token)
            res.status(200).send({success:true,msg:"please check inbox"})
        }     
        else{
            res.status(400).send({error:"User with this email not found"})
        }
    }catch (error){
        res.status(400).send({success:false,msg:error.message})
    }
}
const resetPassword = async (req, res , next) => {
    // if (req.body.password !== req.body.confirmPassword) {
    //     return res.status(404).send({
    //         message: 'password does not match'
    //     })
    // }
    let id = req.userId
    console.log(id)
    bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
    let passwords =  {password :hashedPass}
    
    console.log(passwords)
    let result = await User.findByIdAndUpdate({_id:id},{$set:passwords})
   return res.json({
    message:'success',
    data:result
})
})
}
const sendOtp = async(req,res) => {
    let phone = req.body.phone
    const user = await User.findOne({
        phone:phone
    })
    if(!user){
        return res.status(400).send("user not found")
        
    }
    const sendOtp = Math.floor(100000+Math.random()*900000)
    
    const dataresult = new Otp({
        number:phone,
        otp:sendOtp
    })
    let result = await dataresult.save();
    return res.status(200).json({
        message:"otp send successfully",
        data:result
    })
}

const otpchangePassword = async (req,res) => {
    try{
        let {otp,phone} = req.body;

        let data = await Otp.findOne({otp:otp})
        if(!data){
            return res.status(404).json({
                message:"Otp not found or Invalid Otp please Try again!!!"
            })
        }
        let passkey = {
                password:await bcrypt.hashSync(req.body.password, 8)
            }
        let value = await User.findOne({phone:phone})
        let id = value?.id
          let result = await User.findByIdAndUpdate(id,{$set:passkey})
            return res.status(200).json({
                message:"password changed successfully",
                data:result
            })
        
    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}


module.exports = {
    register, login, forgotPassword,resetPassword,verifyToken,sendOtp,otpchangePassword
}
