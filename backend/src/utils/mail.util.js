import { config } from 'dotenv';
import nodemailer from 'nodemailer'

config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const sendAccountVerificationEmail = async (email, names, verificationToken) => {
    try {
        const info = transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "NodeJS Template Account Verification",
            html:
                `
            <!DOCTYPE html>
                <html>
                <body>
                    <h2>Dear ${names}, </h2>
                    <h2> To verify your account. Click the link below</h2>
                    <a href="${process.env.CLIENT_URL}/auth/verify-email/${verificationToken}" style="color:#4200FE;letter-spacing: 2px;">Click here</a>
                    <p>Best regards,<br>NodeJS Template team</p>
                </body>
            </html>
            `

        });

        return {
            message: "Email sent successfully",
            emailId: info.messageId,
            status: true
        };
    } catch (error) {
        console.log(error);
        return { message: "Unable to send email", status: false };
    }
};

const sendPaswordResetEmail = async (email, names, passwordResetToken) => {
    try {
        const info = transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "NodeJS Template Password Reset",
            html:
                `
            <!DOCTYPE html>
                <html>
                <body>
                    <h2>Dear ${names}, </h2>
                    <h2> Click on the link below to change you password</h2>
                    <a href="${process.env.CLIENT_URL}/auth/reset-password/${passwordResetToken}" style="color:#4200FE;letter-spacing: 2px;">Click here</a>
                    <p>Best regards,<br>NodeJS poc team</p>
                </body>
            </html>
            `

        });

        return {
            message: "Email sent successfully",
            emailId: info.messageId,
            status: true
        };
    } catch (error) {
        console.log(error);
        return { message: "Unable to send email", status: false };
    }
};

export { sendAccountVerificationEmail,sendPaswordResetEmail };