// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const send = async (data) => {
    // SMTP 서버 설정
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP 서버 주소
        port: 587, // SMTP 포트
        secure: false, // true인 경우 465 포트를 사용합니다.
        auth: {
            user: "보안", // 메일 계정 아이디
            pass: "보안" // 메일 계정 비밀번호 //앱 비밀번호 //나중에 가려야됨.
        }
    });

    transporter.sendMail(data, function (error, info) {
        if (error) {
            console.log("Error sending email: " + error);
        } else {
            console.log("Message sent: %s", info.messageId);
            return info.response;
        }
    });
};

app.post('/send-mail', (req, res) => {
    const { to, subject, text } = req.body;

    const content = {
        from: "보안", // 발신자 주소
        to, // 수신자 주소
        subject, // 메일 제목
        text, // 텍스트 본문
        html: `<b>${text}</b>` // HTML 본문
    };

    // 이메일 보내기
    send(content);

    // 클라이언트에 응답
    res.status(200).send('Email sent successfully!');
});

// 이메일 보내기

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
