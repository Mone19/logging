const express = require('express');
const winston = require('winston');

const { combine, timestamp, json, prettyPrint } = winston.format;

const app = express();

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    prettyPrint(),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

app.get('/info', (req, res) => {
  logger.info('This is an info message');
  res.send('This is an info message');
});

app.get('/debug', (req, res) => {
  logger.debug('This is a debug message');
  res.send('This is a debug message');
});

app.get('/error', (req, res) => {
  logger.error('This is an error message');
  res.send('This is an error message');
});

app.get('/fatal', (req, res) => {
  logger.error('This is a fatal message');
  res.send('This is a fatal message');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
