import nodemailer from 'nodemailer';

// Create reusable transporter with environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailParams {
  subject: string;
  text: string;
  html?: string;
  password?: string;
  additionalRecipient?: string;
}

export async function sendFormEmail(params: EmailParams): Promise<boolean> {
  const defaultRecipients = [
    process.env.ADMIN_EMAIL_1,
    process.env.ADMIN_EMAIL_2
  ].filter(Boolean);

  if (defaultRecipients.length === 0) {
    throw new Error("No default recipients configured");
  }

  const recipients = [...defaultRecipients];
  if (params.password && params.additionalRecipient) {
    recipients.push(params.additionalRecipient);
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipients.join(', '),
      subject: params.subject,
      text: params.text,
      html: params.html || params.text,
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('SMTP email error:', error);
    return false;
  }
}