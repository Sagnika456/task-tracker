const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async ({ to, taskTitle, dueDate, userName }) => {
  const mailOptions = {
    from: `"TaskTracker" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Reminder: Today is the last day to finish "${taskTitle}"`,
    html: `
      <h2>Task Reminder</h2>
      <p>Hello ${userName},</p>
      <p>Today is the last day to finish your task:</p>
      <p><strong>${taskTitle}</strong></p>
      <p>Due Date: ${new Date(dueDate).toLocaleDateString()}</p>
      <p>Please complete it before the deadline.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendReminderEmail };