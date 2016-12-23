/*
 * Connect all of your endpoints together here.
 */
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

module.exports = function (app, router) {
  app.use('/api', require('./user.js')(router));
};