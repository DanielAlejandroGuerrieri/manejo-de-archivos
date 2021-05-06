const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require('path');

const { fullName } = require('./middleware/uploadMiddleware');


const textHtml = `<html>
<head>
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
</head>
<body style="font-family: 'Open Sans', sans-serif;">
    <div><strong>LO hemos Logrado:</strong></div><br/>
    <div>Estamos subiendo un archivo, leyendolo y mandandolo.</div><br/>
    <div><ul></ul></div><br/>
    
    
    <div>Que tenga usted un buen día.</div>
</body>
</html>`;

let sendNodemailer = async(file) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "ejemplonodemailer@gmail.com",
            pass: "ejemplo1234",
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    let info = await transporter.sendMail({
        from: "ejemplonodemailer@gmail.com",
        to: "dguerrieri@thinksoft.com.ar", // list of receivers
        subject: "pdf pesado",
        bcc: ["nalonso@thinksoft.com.ar"],
        html: textHtml, // html body,
        attachments: [{ // stream as an attachment
            filename: file.filename,
            content: fs.createReadStream(path.join(__dirname, './public/uploads', file.filename))
        }],

    });

    return info
}

const getAttachment = async(file) => {

    const stream = file; //fs.createReadStream(path.join(__dirname, './public/uploads', file.filename))

    return stream;
}


module.exports = sendNodemailer;