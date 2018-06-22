const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');

const app = express();


const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
};

app.get('/', (req, res) => {
    res.send('HTTPS is working!');
});

app.get('/send', (req, res) => {
    axios({
        method:'get',
        url: 'https://www.capitalone.com/'
    })
    .then((data) => {
        console.log(data);
        res.redirect('https://www.capitalone.com/');
    })
    .catch(err => console.log(err));
});

app.post('/redirect', (req, res) => {
    console.log(req.body);
});

const port = process.env.PORT || 3000;

const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Secure server listening on port ${port}`);
});