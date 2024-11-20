// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const courseRoute = require('./routes/course');
const taskRoute = require('./routes/task'); 
const addTaskRoute = require('./routes/addTask'); // Import the addTask route

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Set up routes
app.use('/api/auth', authRoute);
app.use('/api/courses', courseRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/add-task', addTaskRoute); // Add the add-task route

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/api/auth', (req, res) => {
    res.send('Login is running');
});

app.get('/api/courses', (req, res) => {
    res.send('Courses is running');
});

app.get('/api/tasks', (req, res) => {
    res.send('tasks is running');
});

app.get('/api/add-task', (req, res) => {
    res.send('add-task is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
