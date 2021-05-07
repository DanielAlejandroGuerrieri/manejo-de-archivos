const express = require('express');
const router = new express.Router();
const fsp = require('fs').promises;
const path = require('path');
const sendNodemailer = require('../controllers/nodemailer');

const FOLDER_TO_REMOVE = path.join(__dirname, '../public/uploads')

const { upload } = require('../middleware/uploadMiddleware');


router.post('/archivo', upload.array('file'), async(req, res) => {
    await sendNodemailer(req.file)
        .then(res => {
            console.log(res)
                // response.message = { enviados: res.accepted, noEnviados: res.rejected };
                // response.status = 200;
                // return response;
        })
        .catch((err) => console.log(err));

    fsp.readdir(FOLDER_TO_REMOVE)
        .then(files => {
            const unlinkPromises = files.map(file => {
                const filePath = path.join(FOLDER_TO_REMOVE, file)
                return fsp.unlink(filePath)
            })

            return Promise.all(unlinkPromises)
        }).catch(err => {
            console.error(`Something wrong happened removing files of ${FOLDER_TO_REMOVE}`)
                //--------------agregar el logger de error----------
        })

    res.status(200).send('anda...')
});

module.exports = router