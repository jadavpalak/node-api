const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Blog = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Blog',Blog);