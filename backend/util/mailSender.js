const nodemailer = require('nodemailer');


const mailSender = async (email,title,body)=>{
    try{

        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

         await transporter.sendMail({
            from:'Interactive PDF Chatboat',
            to : email,
            subject:title,
            html:`<h1>OTP :${body}</h1>`
        })
       
    }
    catch(e){
        console.log(e)
    }
}

module.exports = mailSender;