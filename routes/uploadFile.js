const express = require('express');
const router = new express.Router();

const upload = require('../middleware/uploadMiddleware');

console.time('carga');

router.post('/archivo', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file.originalname);

    res.status(200).send('anda...')
});
console.timeEnd('carga');


module.exports = router