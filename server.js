const app = require('./app');

app.listen(process.env.PORT).on('listening', () => {
    console.log('SUCCES Votre projet sur le port ' + process.env.PORT);
});