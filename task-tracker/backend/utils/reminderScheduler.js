const cron = require('node-cron');
const Task = require('../models/Task');
const { sendReminderEmail } = require('./sendEmail');

const startReminderScheduler = () => {
  // run every day at 9 AM
  cron.schedule('0 9 * * *', async () => {
    try {
      const today = new Date();

      const tasks = await Task.find({
        dueDate: {
          $lte: today,
        },
        status: { $ne: 'completed' },
        reminderSent: false,
      }).populate('user');

      for (const task of tasks) {
        await sendReminderEmail({
          to: task.user.email,
          taskTitle: task.title,
          dueDate: task.dueDate,
          userName: task.user.name,
        });

        task.reminderSent = true;
        await task.save();
      }

      console.log(`Reminder emails sent: ${tasks.length}`);
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = { startReminderScheduler };