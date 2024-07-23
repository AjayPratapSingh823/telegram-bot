const { Telegraf } = require('telegraf');
const axios = require('axios');
const User = require('./models/User');
require('dotenv').config()

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome! 🌞 Use /subscribe to get your daily weather updates and brighten your day! 🌈✨ You will receive fresh weather forecasts every 24 hours to keep you prepared and informed. Stay tuned and enjoy the sunshine! ☀️😊'));

bot.command('subscribe', async (ctx) => {
    const chatId = ctx.message.chat.id;
    const fname = ctx.from.first_name;
    const lname = ctx.from.last_name;
    const username = ctx.from.username;

    const user = await User.findOne({ telegramId: chatId });
    if (!user) {
        await User.create({
            username: username,
            fname: fname,
            lname: lname,
            telegramId: chatId,
            subscribed: true
        });
    } else {
        await User.findByIdAndUpdate(user.id, { subscribed: true });
    }

    ctx.reply('Subscribed to daily weather updates! Please share your location.', {
        reply_markup: {
            keyboard: [
                [{ text: 'Share location', request_location: true }]
            ],
            one_time_keyboard: true
        }
    });
});
let lat=0,long=0
bot.on('location', async (ctx) => {
    const chatId = ctx.message.chat.id;
     lat=ctx.message.location.latitude;
     long=ctx.message.location.longitude;

    // Save user location to the database
    ctx.reply('Location received! You will now get weather updates based on your location.');
});
bot.command('unsubscribe', async (ctx) => {
    const chatId = ctx.message.chat.id;
    await User.findOneAndUpdate({ telegramId: chatId }, { subscribed: false });
    ctx.reply('Unsubscribed from daily weather updates.');
});

const sendWeatherUpdates = async () => {
    const users = await User.find({ subscribed: true });
    for (const user of users) {
        const chatId = user.telegramId;
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const desc=weather.data.weather[0].description;
        const temp=weather.data.main.temp;
        const feel=weather.data.main.feels_like;
        bot.telegram.sendMessage(chatId, `Today's weather: ${desc} Temperature: ${temp.toFixed(2)}°C, Feels like: ${feel.toFixed(2)}°C`);
    }
};
sendWeatherUpdates();
setInterval(sendWeatherUpdates, 1);



module.exports = bot;
