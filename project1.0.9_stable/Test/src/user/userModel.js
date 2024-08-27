var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},{ collection: 'users' });

// Create and export a mongoose model based on the 'user' schema.
const User = mongoose.model('user', userSchema);
module.exports = User;


