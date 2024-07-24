const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors=require('cors');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
require('./config/passport')(passport);
const bot = require('./bot');


const app = express();

connectDB();

const corsOptions = {
    origin: 'https://lustrous-flan-be902d.netlify.app/', // Your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
bot.launch()
