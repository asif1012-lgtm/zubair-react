import { z } from 'zod';

export const adminEmailsSchema = z.object({
  defaultEmail: z.string().email("Invalid default admin email"),
  additionalEmails: z.array(z.string().email("Invalid additional email")).optional().default([]),
});

export type AdminEmailsConfig = z.infer<typeof adminEmailsSchema>;

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailConfig extends SMTPConfig {
  adminEmails: AdminEmailsConfig;
}

const loadAdminEmails = (): AdminEmailsConfig => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL environment variable is required');
  }

  return {
    defaultEmail: adminEmail,
    additionalEmails: [],
  };
};

const createSMTPConfig = (prefix: string = ''): SMTPConfig => {
  const host = process.env[`${prefix}SMTP_HOST`] || process.env.SMTP_HOST;
  const port = process.env[`${prefix}SMTP_PORT`] || process.env.SMTP_PORT;
  const user = process.env[`${prefix}SMTP_USER`] || process.env.SMTP_USER;
  const pass = process.env[`${prefix}SMTP_PASS`] || process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    const missing = [
      !host && 'SMTP_HOST',
      !port && 'SMTP_PORT',
      !user && 'SMTP_USER',
      !pass && 'SMTP_PASS'
    ].filter(Boolean);

    throw new Error(`Missing required SMTP configuration: ${missing.join(', ')}`);
  }

  return {
    host,
    port: parseInt(port, 10),
    secure: false,
    auth: { user, pass }
  };
};

export const formOneConfig = (): EmailConfig => ({
  ...createSMTPConfig(),
  adminEmails: loadAdminEmails(),
});

export const formTwoConfig = (): EmailConfig => ({
  ...createSMTPConfig(),
  adminEmails: loadAdminEmails(),
});

export const getAllAdminEmails = (config: AdminEmailsConfig): string[] => {
  return [config.defaultEmail, ...config.additionalEmails];
};