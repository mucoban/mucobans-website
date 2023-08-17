const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.port || 5000


const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many accounts created from this IP, please try again after an hour',
})

const app = express();

app.use(limiter)
app.use(cors());
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 10000
}));

app.get('/', (req, res) => {
    res.json({
        'status': 'OK'
    });
})

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Mongodb has been connected'))
    .catch(error => console.log(error))

require('./routes')(app)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
