const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");
const {HttpError} = require("../helpers");


const storage = multer.diskStorage({
    destination,
    filename: (_, file,cb) =>{
            cb(null,file.originalname);
    }
})

const limits = {
    fileSize: 1024 * 1024
}

const fileFilter = (_,file,cb) =>{
        const {mimetype} = file;
        if(mimetype !== "image/jpeg" || mimetype !== "image/png"){
            cb(HttpError(400, "File can only .jpg or .png extention"), false)
        }
        cb(null,true);
}


const upload = multer({
    storage,
    limits,
    fileFilter,
});


module.exports = upload;