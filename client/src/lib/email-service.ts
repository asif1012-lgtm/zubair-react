import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

export const sendFormEmail = async (formData: any) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: 'New Form Submission',
      html: `
        <h2 style="color: #1877f2;">New Form Submission</h2>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${Object.entries(formData)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('')}
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
