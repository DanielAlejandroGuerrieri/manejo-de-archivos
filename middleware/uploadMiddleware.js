const multer = require("multer");
const extension = require("../classes/MimeTypes");

var path = require("path");
let aux = '';

let fullName = (file) => {
    const ext = new extension();
    const name = file.originalname.split('.')[0];
    aux = name + "-" + Date.now() + ext.getExtension(file.mimetype);
    return aux;

};

var storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../", "public/uploads")); //definimos donde guardar el archivo
    },
    filename: function(req, file, cb) {
        // const ext = new extension();
        // const name = file.originalname.split('.')[0];
        // fullName = name + "-" + Date.now() + ext.getExtension(file.mimetype);

        cb(
            null,
            fullName(file) //se guarda el nombre del archivo con info de fecha y tipo 
        );
    }
});


const upload = multer({
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    dest: path.join(__dirname, "../", "public"),
    storage: storage
});

//module.exports.fullName = fullName;
module.exports = { upload };