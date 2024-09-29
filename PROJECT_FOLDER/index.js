const express = require('express');
require('dotenv').config();
const { sequelize } = require('./database/models');
const Employee = require('./server/api/employee');
const Profile = require('./server/api/profile');
const Family = require('./server/api/family');
const Education = require('./server/api/education');

const Port = process.env.PORT || '5001';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = async (data) => {
    res.send = oldSend; // set function back to avoid the 'double-send'
    const statusCode = data.output?.statusCode || res.statusCode;
    let bodyResponse = { data };
    if (statusCode !== 200 && data.isBoom) {
      bodyResponse = data.output.payload;
    }

    return res.status(statusCode).send(bodyResponse);
  };

  next();
});

// Route middlewares
app.use('/api/employee', Employee);
app.use('/api/profile', Profile);
app.use('/api/family', Family);
app.use('/api/education', Education);

const databaseSyncing = async (count) => {
  try {
    await sequelize.authenticate(); // Check connection database
    await sequelize
      .sync()
      .then(() => console.log('Database synced'))
      .catch((err) => console.error('Error syncing Database:', err));
  } catch (error) {
    console.error(`Unable to connect to the database. Retrying in 3 seconds...`);
    count -= 1;
    if (count === 0) {
      console.error('All retry attempts failed:', error.message);
      process.exit(1); // Exit the process if the database isn't ready after all retries
    } else {
      await new Promise((res) => {
        setTimeout(res, 3000);
      }); // Wait before retrying

      databaseSyncing(count);
    }
  }
};

databaseSyncing(5);

app.listen(Port, () => {
  console.log(['Info'], `Server started on port ${Port}`);
});
