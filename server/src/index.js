const express = require('express')
const session = require('express-session');
require('./mongo');

//variables
const port = 3000

//setup
const app = express();

//routes
const userRouter = require("./routes/userRoutes");
const exercisesRouter = require("./routes/exercisesRoutes");
const workoutsRouter = require("./routes/workoutsRoutes");

//middleware
app.use(express.json()); //parse JSON body
app.use(session({
    secret: "fluffy window cat", //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false 
}));

// Routes
app.use("/user", userRouter);
app.use("/exercises", exercisesRouter);
app.use("/workouts", workoutsRouter);

// Start server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))