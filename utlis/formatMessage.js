let moment = require('moment');
function formatMesage(msg, text) {
    return {
        msg,
        text,
        time: moment().format('h:mm a')
    }
}
module.exports = formatMesage;