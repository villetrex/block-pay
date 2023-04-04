import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

router.post('/login', function (req, res) {
  passport.authenticate('validate-auth', { session: false }, (err: any, user: any) => {
    if (err || !user) {
      console.log('error is', err);
      console.log('user is ................', user);
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'secret');
      return res.json({ user, token });
    });
  })(req, res);
});
// router.post('/login', passport.authenticate('validate-auth'), (req, res) => {
//   console.log('req object................................................................', req.user);
//   res.json({ user: req.session });
// });

export default router;
