const express = require("express");
const Workout = require("../models/workouts");
const Exercise = require("../models/exercises");
const router = express.Router();

//auth check middleware
router.use((req, res, next) => {    
    if(req.session.user) {
        next();
    } else {
        console.log("user must login before accessing authed routes");
        res.status(401).send("please login");
    }
});


router.get("/", async (req, res) => {
    try {
        const workout = await Workout.find({owner: req.session.user.id}).populate('exercises');
        res.json(workout);
    } catch {
        res.status(400).send("bad request");

    }
})


router.post("/new", async (req, res) => {
    req.body.owner = req.session.user.id; //ensures logged in user owns this workout

    try {
        const workout = await Workout.create(req.body);
        res.json(workout);
    } catch {
        res.status(400).send("bad request")
    }

});

//add exercise to the workout

/*
    {
        workoutID: String,
        exerciseID: String
    }
*/

router.post('/exercises/add', async (req, res) => {
    try{
        const workout = await Workout.findOne({owner: req.session.user.id, _id: req.body.workoutID});
        const exercise = await Exercise.findOne({_id: req.body.exerciseID});
        console.log(workout, exercise);
        if(!workout || !exercise){
            res.status(400).send("bad request");
        } else {
            workout.exercises.push(exercise); //add exercise to worktout array
            const result = await workout.save();//save to database
    
            res.json(result);
        }
    } catch {
        res.status(400).send("bad request");

    }
})


router.patch('/exercise/remove', async (req, res) => {
    try {
        const workout = await Workout.findOne({owner: req.session.user.id, _id: req.body.listID}).populate('exercise');
        
        //filter out any matching ID
        workout.exercises = workout.exercises.filter((exercise) => {
            return exercise.id !== req.body.itemID
        });

        const result = await workout.save(); //update database
        res.json(result);
    } catch {
        res.status(400).send("bad request");
    }
})

module.exports = router;
