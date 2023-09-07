const crypto = require('crypto');

module.exports = {
    generateOrderID(userId) {
        const input = userId + '-' + Date.now();
        const output = Buffer.from(input, 'utf8').toString('base64').toUpperCase();
        return output;
    }
}