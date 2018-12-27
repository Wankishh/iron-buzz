import app from './controllers/App';

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`IB service is listening on port ${port}`);
});