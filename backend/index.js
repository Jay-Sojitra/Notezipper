const express = require('express');
const app = express();
const env = require('dotenv');
const notes = require('./data/notes');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

env.config();


connectDB();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to my world');
});

app.use('/api/users', userRoutes);
app.use('/api/users/login', userRoutes);
app.use('/api/users/profile', userRoutes);  
app.use('/api/notes', noteRoutes);


app.get('/api/notes/:id', (req, res) => {
    const note = notes.find((n) => n._id === req.params.id)
    res.send(note);
})

app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));
