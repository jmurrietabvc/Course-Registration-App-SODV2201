const express = require('express');
const app = express();
const port = 5544;
const cors = require('cors');


const {
    connectToDatabase,
    showPrograms,
} = require('./database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));

connectToDatabase();

app.get('/programs', async (req, res) => {
    const programs = await showPrograms();
    res.json(programs);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


