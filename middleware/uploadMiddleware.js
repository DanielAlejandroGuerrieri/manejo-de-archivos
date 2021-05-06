const multer = require("multer");
const extension = require("../classes/MimeTypes");

var path = require("path");


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../", "public/uploads")); //definimos donde guardar el archivo
    },
    filename: function(req, file, cb) {
        const ext = new extension();
        const name = file.originalname.split('.')[0];
        cb(
            null,
            name + "-" + Date.now() + ext.getExtension(file.mimetype) //se guarda el nombre del archivo con info de fecha y tipo 
        );
    }
});

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    dest: path.join(__dirname, "../", "public"),
    storage: storage
});

module.exports = upload;