const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let server = require('./qr'),
    code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;
app.use('/qr', server);
app.use('/code', code);
app.get(['/pair', '/pair/', '/pair.html'], async (req, res, next) => {
    res.sendFile(__path + '/pair.html')
})
app.get(['/', '/index.html'], async (req, res, next) => {
    res.sendFile(__path + '/index.html')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
viper md Pair is Live

 Server running on http://0.0.0.0:` + PORT)
})

module.exports = app

