const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const md5 = require('md5');

dotenv.config();

const app = express();
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '100mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Hello' });
});

app.post('/upload', (req, res) => {
    console.log("oki");
    const { name, size, currentChunkIndex, totalChunk } = req.query;
    const firstChunk = currentChunkIndex === 0;
    const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunk) - 1;
    const ext = name.split('.').pop();
    const data = req.body.toString().split(',')[1];
    const buffer = Buffer.from(data);
    const tmpFilename = 'tpm_' + md5(name + req.ip) + '.' + ext;
    if (firstChunk && fs.existsSync('./uploads/' + tmpFilename)) {
        fs.unlinkSync('./uploads/' + tmpFilename);
    }
    fs.appendFileSync('./uploads/' + tmpFilename, buffer);
    if (lastChunk) {
        const finalFilename = md5(Date.now()).substring(0, 6) + '.' + ext;
        fs.renameSync('./uploads/' + tmpFilename, './uploads/' + finalFilename);
        res.json({ finalFilename })
    } else {
        res.send("oki");
    }

});

module.exports = app;