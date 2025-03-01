const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/temp")
    },

    filename: function(req, file, cb){
        crypto.randomBytes(12, function(err, name){
            const filename = Date.now() + "-" + file.originalname;
            cb(null, filename)
        })
        
    }
})

const upload = multer({ storage: storage });
module.exports = upload;