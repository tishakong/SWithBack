const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

//추가
const session = require('express-session');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//추가
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

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

    //추가
    console.log('보내진 인증코드 : ', req.session.verificationCode);

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
            //추가
            res.status(200).send('이메일 전송에 성공하였습니다.');
        }
    });
});

router.post('/verifyCode', (req, res) => {
    const { codeFromUser } = req.body;
    const expectedCode = req.session.verificationCode; 

    console.log('입력된 코드 : ',codeFromUser);
    console.log(typeof codeFromUser);
    console.log('전송된 코드 : ',expectedCode);
    console.log(typeof expectedCode);

    //추가
    console.log('보내진 인증코드 : ', req.session.verificationCode);

    if (codeFromUser === expectedCode) {
        res.status(200).send('인증에 성공했습니다.');
    
    } else {
        res.status(400).send(`올바르지 않은 인증 코드입니다.`);
    }
});

module.exports = router;



