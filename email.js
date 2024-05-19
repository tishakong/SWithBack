// email.js

const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'swithsookmyung@gmail.com',
        pass : process.env.EMAIL_PASSWORD
    }
});

router.post('/sendVerificationCode', (req, res) => {
    const { email } = req.body;

    const verificationCode = randomstring.generate({
        length : 6,
        charset : 'numeric'
    });
    
    const mailOptions = {
        from : 'swithsookmyung@gmail.com',
        to : email,
        subject : '인증 코드',
        text : `인증 코드 : ${verificationCode}`
    };
    

    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
            console.log('이메일 전송 오류: ',error);
            res.status(500).send('이메일 전송 중 오류가 발생했습니다.');
        } else {
            console.log('이메일 전송 성공: ', info.response);
            res.status(200).json({ code: verificationCode});
        }
    });
});

module.exports = router;
