const express = require('express');
const router = new express.Router();

const upload = require('../middleware/uploadMiddleware');

router.post('/archivo', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file.originalname);
    res.status(200).send('anda...')
});

module.exports = router