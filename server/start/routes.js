const express = require('express');
const list = require('../routes/list.js');
const userCreation = require('../routes/userCreation');
const userAuthentification = require('../routes/userAuthentification');
const cost = require('../routes/cost');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/list', list);
    app.use('/api/userCreation', userCreation);
    app.use('/api/userAuthentification', userAuthentification);
    app.use('/api/cost', cost);
};