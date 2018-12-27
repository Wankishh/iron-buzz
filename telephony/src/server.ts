import app from './controllers/App';

const port = process.env.PORT || 3000;

app.get('/', (req, res) => { return res.send('404') });

app.listen(port, () => {
    console.log(`Telephony service is listening on port ${port}`);
});