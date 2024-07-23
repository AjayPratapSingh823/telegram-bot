const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
   fname: { type: String, },
    lname: { type: String,  },
    username: { type: String,unique:true  },
    telegramId: { type: Number }, // Optional, for storing Telegram ID
    subscribed: { type: Boolean, default: false } // Optional, for subscription status
});
module.exports = mongoose.model('User', UserSchema);
