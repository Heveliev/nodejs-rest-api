const bcrypt = require("bcrypt");
const {HttpError} = require("../../helpers");
const {User} = require("../../models");


const gravatar = require('gravatar');

const register = async(req,res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409,"Email already in use");
    }

    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' });

const hashPassword = await bcrypt.hash(password, 10)
const newUser = await User.create({...req.body,avatarURL, password: hashPassword} );
res.status(201).json({
    email: newUser.email,
    name: newUser.name,
})
}


module.exports = register;



