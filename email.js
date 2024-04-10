const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');


const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service : 'naver',
    auth : {
        user : 'ha9eun@naver.com',
        pass : process.env.EMAIL_PASSWORD
    }
});

router.post('/sendVerificationCode', (req, res) => {
    const { email } = req.body;

    const verificationCode = randomstring.generate({
        length : 6,
        charset : 'numeric'
    });
    
    req.session.verificationCode = verificationCode;

    const mailOptions = {
        from : 'ha9eun@naver.com',
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
            res.status(200).send('인증 코드가 성공적으로 전송되었습니다.');
        }
    });
});

router.post('/verifyCode', (req, res) => {
    const { codeFromUser } = req.body;
    const expectedCode = req.session.verificationCode; 


    if (codeFromUser == expectedCode) {
        res.status(200).send('인증에 성공했습니다.');
    } else {
        res.status(400).send(`올바르지 않은 인증 코드입니다.`);
    }
});

module.exports = router;
