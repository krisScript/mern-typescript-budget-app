import jwt from 'jsonwebtoken';
import sendEmail from './sendEmail';
import MailOptions from '../interfaces/MailOptions';
const sendEmailConfirmation = (userId: string, email: string): void => {
  const emailSecret: any = process.env.EMAIL_SECRET;
  const token = jwt.sign(
    {
      userId,
    },
    emailSecret,
    { expiresIn: '1h' },
  );
  const appEmail: any = process.env.EMAIL;
  const url = `http://localhost:3000/auth/confirmation/${token}`;
  const mailOptions: MailOptions = {
    from: appEmail,
    to: email,
    subject: 'Email confirmation.',
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
  };
  sendEmail(mailOptions);
};
export default sendEmailConfirmation;
