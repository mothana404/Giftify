const express = require('express');
const router = express.Router();
const userscontrol = require('../Controllers/usersController');
const middleware = require('../Middleware/userAuth');
const google = require('../Middleware/googleAuth');
const passport = require('passport');
require('../Controllers/googleAuth');

router.post('/register', userscontrol.createUser);
router.post('/login', userscontrol.loginUser);

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/not',
}));

router.get('/protected', middleware.authorize, (req, res) => {
    res.send('hello');
});

router.get('/not' , (req, res) => {
    res.send('unauthirized');
});

module.exports = router;