interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  adminEmail: string;
}

export const validationFormEmailConfig: EmailConfig = {
  host: process.env.VALIDATION_SMTP_HOST || '',
  port: parseInt(process.env.VALIDATION_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.VALIDATION_SMTP_USER || '',
    pass: process.env.VALIDATION_SMTP_PASS || ''
  },
  adminEmail: process.env.VALIDATION_ADMIN_EMAIL || ''
};

export const confirmationFormEmailConfig: EmailConfig = {
  host: process.env.CONFIRMATION_SMTP_HOST || '',
  port: parseInt(process.env.CONFIRMATION_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.CONFIRMATION_SMTP_USER || '',
    pass: process.env.CONFIRMATION_SMTP_PASS || ''
  },
  adminEmail: process.env.CONFIRMATION_ADMIN_EMAIL || ''
};
