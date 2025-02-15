interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  adminEmails: string[];
}

const defaultConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  },
  adminEmails: [
    process.env.ADMIN_EMAIL || '',
    process.env.ADMIN_EMAIL_2 || '',
    process.env.ADMIN_EMAIL_3 || ''
  ].filter(Boolean)
};

export const formOneConfig: EmailConfig = {
  ...defaultConfig,
  host: process.env.FORM_ONE_SMTP_HOST || defaultConfig.host,
  auth: {
    user: process.env.FORM_ONE_SMTP_USER || defaultConfig.auth.user,
    pass: process.env.FORM_ONE_SMTP_PASS || defaultConfig.auth.pass
  }
};

export const formTwoConfig: EmailConfig = {
  ...defaultConfig,
  host: process.env.FORM_TWO_SMTP_HOST || defaultConfig.host,
  auth: {
    user: process.env.FORM_TWO_SMTP_USER || defaultConfig.auth.user,
    pass: process.env.FORM_TWO_SMTP_PASS || defaultConfig.auth.pass
  }
};