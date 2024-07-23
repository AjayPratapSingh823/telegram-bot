const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config()

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://telegram-bot-ygd7.onrender.com/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
        };
        try {
            let user = await Admin.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await Admin.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Admin.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
