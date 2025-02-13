const express = require('express');
const cors = require('cors');
const connectdb = require('./connections/connectdb.js');
require('dotenv').config();

const app = express();
connectdb();

app.use(cors());
app.use(express.json());
const cron = require('node-cron');


app.use(cors({
    origin: ['http://localhost:5173'], // Add your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials if necessary
}));


app.use('/api/health', ()=> {
    res.send('Healthy');
});
app.use('/',require('./routes/shorturl.js'));
app.use('/api/shorturl', require('./routes/shorturl.js'));
app.use('/api/validate', require('./routes/validate.js'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});