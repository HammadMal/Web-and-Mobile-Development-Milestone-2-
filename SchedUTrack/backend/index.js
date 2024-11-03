require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Apply CORS middleware at the beginning
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Routes
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

// Test routes for server and database connection
app.get('/test', (req, res) => {
    res.send("Server is running and DB is connected");
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
