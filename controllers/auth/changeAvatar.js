const {User} = require("../../models");

const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');

const userPath = path.resolve("public", "avatars");

const changeAvatar = async(req,res) => {

    const { _id } = res.user;
    const {path:oldPath, originalname } = req.file;
    const filename = `${_id}_${originalname }`;
    const newPath = path.join(userPath,filename);

    await Jimp.read(oldPath).then((image) => {
      image.resize(250, 250);
      image.write(oldPath);
    });

    await fs.rename(oldPath,newPath);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id,{avatarURL});

     res.json({
    avatarURL,
  });

}


module.exports = changeAvatar;

