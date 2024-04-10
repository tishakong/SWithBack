const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');


const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
    
    req.session.verificationCode = verificationCode;

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
            // 세션 ID를 응답으로 클라이언트에게 보냄
            res.setHeader('Set-Cookie', `sessionId=${req.sessionID}; Path=/`);
            res.status(200).json({ code: verificationCode});
        }
    });
});

router.post('/verifyCode', (req, res) => {
    const { codeFromUser } = req.body;
    const expectedCode = req.session.verificationCode; 

    console.log(codeFromUser);
    console.log(typeof codeFromUser);
    console.log('전송된 코드 : ',expectedCode);
    console.log(typeof expectedCode);


    if (codeFromUser === expectedCode) {
        res.status(200).send('인증에 성공했습니다.');
    
    } else {
        res.status(400).send(`올바르지 않은 인증 코드입니다.`);
    }
});

module.exports = router;
