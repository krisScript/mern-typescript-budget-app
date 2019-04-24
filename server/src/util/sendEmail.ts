import nodemailer from 'nodemailer';
import MailOptions from '../interfaces/MailOptions';
const sendEmail = (mailOptions: MailOptions): void => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: '',
    },
  });
  transporter.sendMail(
    mailOptions,
    (err: any, data: any): void => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent');
      }
    },
  );
};
export default sendEmail;
