const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('This task runs every minute');
});

cron.schedule('0 0 * * *', () => {
  console.log('Midnight task running...');
});
