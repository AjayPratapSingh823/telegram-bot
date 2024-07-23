const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
   name: { type: String, },
    email: { type: String,  },
    googleId: { type: String,  },
});
module.exports = mongoose.model('Admin', AdminSchema);
