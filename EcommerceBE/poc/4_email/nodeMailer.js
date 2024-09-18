const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ashok.sai7@gmail.com",
    pass: "vpyl gmgd sdbk rrii",
  },
});

// async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: '"Sai Ashok Suguri" <ashok.sai7@gmail.com>', // sender address
    to: "ashok.sai7@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<!DOCTYPE html><html><body><h1>Hello world?</h1></body></html>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>


//main().catch(console.error);