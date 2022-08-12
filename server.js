require('dotenv').config()
const express = require('express');
const app = express()
const port = process.env.PORT ?? 3000;
const mongoose = require('mongoose');
const { version } = require("./package.json");
const { dailyGenerate } = require('./scraper');

mongoose.connect( (process.env.MONGO_URI + '/news') ?? 'mongodb://localhost:27017/news');

app.use( express.json() )
require('./Feed/routes')(app)


app.post('/generateDaily', async (req, res)=>{

    const generateds = await dailyGenerate();
    return res.status(200).send({
        ok: true,
        todaysNews: generateds
    })

})

app.get('/', (req, res) => {
    return res.status(200).send({
        ok: true,
        message: `Welcome to news Backend version: ${version}`
    });
})

app.listen(port, async () => {
    console.log(`✅ Express:${port}`)
})
