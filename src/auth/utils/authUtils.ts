var CryptoJS = require('crypto-js')
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'



export const encryptPassword = async (password: string) => {
  var hashedPassword = await CryptoJS.AES.encrypt(password, process.env.KEY).toString()
  return hashedPassword
}
export const decryptPassword = async (password: string) => {
  var bytes = CryptoJS.AES.decrypt(password,process.env.KEY);
  var decryptedPassword = await bytes.toString(CryptoJS.enc.Utf8)
  return decryptedPassword
}

export const generateTokenOtb = () => Math.floor(100000 + Math.random() * 900000).toString();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})
export async function sendEmail(email: any, token: any) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'CODIGO DE AUTENTICACION',
      text: token.toString(),
    })
    return 'ok'
  } catch (error: any) {
    return error.message
  }
}
export async function generateJWT(userId:string,sessionId:string) {

    const payload = { userId: userId, sessionId: sessionId};
    const secret = process.env.KEY || 'secret_key';
    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    return token
}
export async function verifyJwtToken(token:string)
{
    const secret = process.env.KEY || 'secret_key';
    return jwt.verify(token, secret);
}
export function generateExpirationDate()
{
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const year = expirationDate.getFullYear();
      const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
      const day = String(expirationDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`; 
      return formattedDate
}
