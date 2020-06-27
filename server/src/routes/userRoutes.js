const express   = require("express");
const router    = express.Router();
const User      = require('../models/User');
const bcrypt    = require('bcryptjs');

router.post('/new', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await User.create(req.body);     
    res.send(data);    
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    let status = 404;
    let msg = "try again";

    if(user && await bcrypt.compare(req.body.password, user.password)) {        
        //add to session
        req.session.user = {
            username: user.username,
            id: user._id,
            loggedIn: true
        }
        status = 200;
        msg = {id:user._id};        
    }

    res.status(status).send(msg);
});

router.get('/logout', (req, res) => {
    //destroy session      
    req.session.destroy(() => {
        res.send('logged out');
    });    
});


///Edit user info

router.patch('/profile/update', async (req, res) => {
    console.log('req.body', req.body)
    try {
        const data = await User.findByIdAndUpdate(req.session.user.id, req.body, {new: true});
        res.json(data);
        console.log(data);
    } catch {
        res.status(400).send("bad request");
    }   
});

//get user info

router.get('/profile', async (req, res) => {
    const data = await User.findById(req.session.user.id);
    console.log(data);
    res.send(data.profile)

})

module.exports = router;