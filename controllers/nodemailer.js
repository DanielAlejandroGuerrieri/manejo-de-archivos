const nodemailer = require("nodemailer");

const attachments = require('./attachFiles');


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
        port: 1000,
        secure: false,
        auth: {
            user: "ejemplo@ejemplo",
            pass: "ejemplo",
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    let info = await transporter.sendMail({
        from: "ejemplonodemailer@gmail.com",
        to: "mail", // list of receivers
        subject: "pdf pesado",
        bcc: ["mail"],
        html: textHtml, // html body,
        attachments: await attachments(),

    });

    return info
}



module.exports = sendNodemailer;