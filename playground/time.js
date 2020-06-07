var moment = require('moment');

var createdAt = moment().valueOf();
var date = moment(createdAt);
console.log(date.format('Do MMM, YYYY  hh:mm a'));