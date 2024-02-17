require('dotenv').config();
const mongoose = require('mongoose');
const connecting_string = process.env.CONNECTION_STRING;
const winston = require('winston');

module.exports = function() {
    mongoose.connect(connecting_string)
    .then(() => winston.info('Connection sucessful'))
};