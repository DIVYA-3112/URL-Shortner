const mongoose = require('mongoose');
const CONNECT_STRING = process.env.CONNECT_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECT_STRING);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;