const moment = require('moment');

const formatDate = (date) => (moment(date, moment.ISO_8601).utc().format("l"));

module.exports = formatDate;