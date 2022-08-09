require('dotenv').config()
const app = require('express')();
const port = process.env.PORT ?? 3000;
const mongoose = require('mongoose');
const { version } = require("./package.json");

mongoose.connect( (process.env.MONGO_URI + '/news') ?? 'mongodb://localhost:27017/news');

app.get('/', (req, res) => {
    return res.status(200).send({
        ok: true,
        message: `Welcome to news Backend version: ${version}`
    });
})

app.listen(port, async () => {
    console.log(`✅ Express:${port}`)
})
