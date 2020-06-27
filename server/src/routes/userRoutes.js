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
        msg = 'logged in';        
    }

    res.status(status).send(msg);
});

router.get('/logout', (req, res) => {
    //destroy session      
    req.session.destroy(() => {
        res.send('logged out');
    });    
});

module.exports = router;