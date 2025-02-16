import { z } from 'zod';

// Schema for admin emails configuration
export const adminEmailsSchema = z.object({
  defaultEmail: z.string().email("Invalid default admin email"),
  additionalEmails: z.array(z.string().email("Invalid additional email")).optional().default([]),
});

export type AdminEmailsConfig = z.infer<typeof adminEmailsSchema>;

// SMTP Configuration interface
interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Full email configuration type
export interface EmailConfig extends SMTPConfig {
  adminEmails: AdminEmailsConfig;
}

// Load and validate admin emails
const loadAdminEmails = (): AdminEmailsConfig => {
  const defaultEmail = process.env.ADMIN_EMAIL;
  if (!defaultEmail) {
    throw new Error('Default admin email (ADMIN_EMAIL) is required');
  }

  return {
    defaultEmail,
    additionalEmails: [
      process.env.ADMIN_EMAIL_2,
      process.env.ADMIN_EMAIL_3,
    ].filter((email): email is string => typeof email === 'string' && email.length > 0),
  };
};

// Create SMTP configuration
const createSMTPConfig = (prefix: string = ''): SMTPConfig => {
  const host = process.env[`${prefix}SMTP_HOST`] || process.env.SMTP_HOST;
  const port = process.env[`${prefix}SMTP_PORT`] || process.env.SMTP_PORT;
  const user = process.env[`${prefix}SMTP_USER`] || process.env.SMTP_USER;
  const pass = process.env[`${prefix}SMTP_PASS`] || process.env.SMTP_PASS;

  console.log(`Loading SMTP config with prefix "${prefix}":`, {
    host: host,
    port: port,
    user: user ? '✓ Present' : '✗ Missing',
    pass: pass ? '✓ Present' : '✗ Missing'
  });

  if (!host || !port || !user || !pass) {
    const missing = [
      !host && 'SMTP_HOST',
      !port && 'SMTP_PORT',
      !user && 'SMTP_USER',
      !pass && 'SMTP_PASS'
    ].filter(Boolean);

    throw new Error(`Missing required SMTP configuration for ${prefix || 'default'}: ${missing.join(', ')}`);
  }

  return {
    host,
    port: parseInt(port, 10),
    secure: false,
    auth: { user, pass }
  };
};

// Export configurations for different form types
export const formOneConfig = (): EmailConfig => ({
  ...createSMTPConfig('FORM_ONE_'),
  adminEmails: loadAdminEmails(),
});

export const formTwoConfig = (): EmailConfig => ({
  ...createSMTPConfig('FORM_TWO_'),
  adminEmails: loadAdminEmails(),
});

// Helper function to get all admin emails as array
export const getAllAdminEmails = (config: AdminEmailsConfig): string[] => {
  return [config.defaultEmail, ...config.additionalEmails];
};