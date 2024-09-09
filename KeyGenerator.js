const crypto = require('crypto');

const KeyGenerator = {
    generateSecretKey() {
        return crypto.randomBytes(32).toString('hex');
    },

    generateHMAC(secretKey, message) {
        return crypto.createHmac('sha256', secretKey).update(message).digest('hex');
    }
};

module.exports = KeyGenerator;