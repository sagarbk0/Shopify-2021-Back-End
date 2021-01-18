const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImageModel = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    storage: {
        type: Array
    }
});

module.exports = mongoose.model('ImageModel', ImageModel);
