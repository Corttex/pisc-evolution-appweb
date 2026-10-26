import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailProps {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html, text }: SendMailProps) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Piscinas Evolution" <contato@piscinasevolution.com.br>',
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ''), // Strips HTML tags if text is not provided
      html,
    });

    console.log('Mensagem enviada com sucesso: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, error };
  }
}
