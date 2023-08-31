const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose")

require ("dotenv").config();

// express application
const app = express();

// middleware

//access json data if request obj has it
app.use(express.json());

// log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/workouts", workoutRoutes);

//connect to DB
const DATABASE = process.env.MONGO_URI;
mongoose.connect(DATABASE)
    .then(() => {
        // listen for requests
        const PORT = process.env.PORT;
        
        app.listen(PORT, () => {
            console.log(`connected to DB & listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

