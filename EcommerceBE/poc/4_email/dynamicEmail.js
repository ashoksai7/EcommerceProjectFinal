// signup -> on sign up send email, welcome
// preparation welcome email template -> placeholders for name
// execution -> take that template -> read -> string -> replace -> actual value

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ashok.sai7@gmail.com",
    pass: "vpyl gmgd sdbk rrii",
  },
});

function updateTemplate(htmlString,emailObject){
    let keysArray = Object.keys(emailObject);
    //console.log(keysArray);
    keysArray.forEach((key)=>{
        htmlString = htmlString.replace(`#{${key}}`,emailObject[key]);
    })
    return htmlString;
}

async function emailSender(template,receiverEmail,emailObject){
    try{
    const templatePath = path.join(__dirname,"templates",template);
    //console.log(templatePath);
    const htmlString = await fs.promises.readFile(templatePath,"utf-8");
    const finalEmailContent = updateTemplate(htmlString,emailObject);
    //console.log(finalEmailContent);
    const msg = {
        from: '"Sai Ashok Suguri" <ashok.sai7@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        cc:"ashok.sai7@gmail.com",
        bcc:"ashok.sai7@gmail.com",
        attachments:[
            {
                filename: "gruhapravesham.jpeg",
                path:"/Users/saiashokkrishnareddysuguri/Downloads/homamimage.jpeg"
            }
        ],
        subject: "Thank you for your signup || Bongulo platform || V1.1", // Subject line
        text: "Hello world?", // plain text body
        html: finalEmailContent // html body
    }
    await transporter.sendMail(msg);
    }catch(err){
        console.log(err);
    }

}

//emailSender("signup.html","sreejareddy2311@gmail.com",{"name":"A K Nithin Reddy, Pallavi nilayam, B R Ambedkar nagar, Hyderabad"}).then(()=>console.log("mail sent"));

module.exports = emailSender;