require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const assignmentsRoutes = require('./routes/assignments');

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/assignments', assignmentsRoutes);

// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen
        app.listen(process.env.PORT, () => {console.log('Server is running on port', process.env.PORT);
    });

    })
    .catch((error) => {
        console.log(error);
    });
