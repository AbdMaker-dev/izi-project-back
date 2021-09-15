const app = require('./app');
const userRoute = require('./routes/userRoute');
const projetRouter = require('./routes/projetRoute');

app.use('/api/v1', userRoute);
app.use('/api/v1', projetRouter);

app.listen(process.env.PORT).on('listening', () => {
    console.log('SUCCES Votre projet sur le port ' + process.env.PORT);
});