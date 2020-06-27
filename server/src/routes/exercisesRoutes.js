const express   = require("express");
const Exercise = require('../models/exercises');
const router = express.Router();

//public routes
router.get("/", async (req, res) => {
    const data = await Exercise.find(({}));
    res.send(data)
    console.log(data);
})

router.get("/:id", async (req, res) => {
    const data = await Exercise.findOne({_id: req.params.id});
});

//authenticated routes
//only allow if logged in


router.use((req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.status(401).send("Please login");
    }
});


router.post('/new', async (req, res) => {
    try {
        const data = await Exercise.create(req.body);
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const data = await Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }   
});

router.delete('/delete/:id', async (req, res) =>{
    try {
        const data = await Exercise.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
});

module.exports = router;