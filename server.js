const app = require('./app');
const userRoute = require('./routes/userRoute');
const projetRouter = require('./routes/projetRoute');
const { getCityWithLatAndLong } = require('./utils/city');
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    apiKey: 'AIzaSyAff7hCiHNij58vD3nJA9mRhVu0FzOUXBk',
    formatter: null
};

const geocoder = NodeGeocoder(options);

geocoder.reverse({ lat: 14.786368, lon: -17.311941 }).then((result) => {
    console.log('====================================');
    console.log(result[0].city);
    console.log('====================================');
});

// getCityWithLatAndLong("14.786368", "-17.311941");

// ------------------------------------------------------------------------------------------------------
app.use('/api/v1', userRoute);
app.use('/api/v1', projetRouter);

app.listen(process.env.PORT).on('listening', () => {
    console.log('SUCCES Votre projet sur le port ' + process.env.PORT);
});