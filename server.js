const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// CORS 미들웨어 설정
app.use(cors());

// JSON 파싱을 위한 미들웨어 설정
app.use(express.json());

// 이메일 전송을 위한 Transporter 생성
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// /send-email 경로에 대한 POST 요청 처리
app.post('/send-email', (req, res) => {
    const suggestion = req.body.suggestion;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: '건의사항 제출',
        text: '건의사항: ' + suggestion
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('이메일 보내기 오류');
        } else {
            console.log('이메일 보내기 성공: ', info);
            res.status(200).send('이메일 보내기 성공');
        }
    });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
