// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const courseRoute = require('./routes/course');
const taskRoute = require('./routes/task'); 
const addTaskRoute = require('./routes/addTask'); // Import the addTask route
const attendanceRoutes = require('./routes/attendance');
const gradesRoute = require('./routes/grade');
const scheduleRouter = require('./routes/schedule');
const settingsRoute = require('./routes/settings');

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
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradesRoute);
app.use('/api/schedule', scheduleRouter);
app.use('/api/settings', settingsRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
