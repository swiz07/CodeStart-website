
const mongoose = require('mongoose');

const connectDB = mongoose.connect(process.env.CON_STR)
    .then(() => console.log('Connected!'))
    .catch((err) => {
        console.log('database not connected')
    })

module.exports = connectDB
