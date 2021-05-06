const express = require('express');
const router = new express.Router();
// const fs = require('fs');
// const path = require('path');
const sendNodemailer = require('../nodemailer');


//const upload = require('../middleware/uploadMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/archivo', upload.single('file'), async(req, res) => {
    await sendNodemailer(req.file)
        .then(res => {
            console.log(res)

            // response.message = { enviados: res.accepted, noEnviados: res.rejected };
            // response.status = 200;
            // return response;
        })
        .catch((err) => console.log(err))

    res.status(200).send('anda...')
});

module.exports = router