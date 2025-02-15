const bcrypt = require("bcrypt");
const {HttpError, sendEmail} = require("../../helpers");
const {User} = require("../../models");
const { nanoid } = require("nanoid");

const { PROJECT_URL } = process.env;
const gravatar = require('gravatar');

const register = async(req,res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409,"Email already in use");
    }

    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' });

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();


    const newUser = await User.create({...req.body,avatarURL, password: hashPassword,verificationCode} );

    const verifyEmail =  {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${PROJECT_URL}/users/verify/${verificationCode}">Click to verify email</a>`,
      };
    
    await sendEmail(verifyEmail);
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
}


module.exports = register;



