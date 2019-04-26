import express from 'express';
import { body } from 'express-validator/check';
import User from '../models/User';

import {
  login,
  signUp,
  confirmEmail,
  requestEmailConfirmation,
} from '../controllers/auth';
const router = express.Router();

router.post(
  '/sign-up',
  [
    body(
      'username',
      'Please choose another password. It should be at least 4 characters long.',
    )
      .isLength({ min: 4 })
      .isString()
      .trim()
      .custom(
        (username: string, { req }): Promise<void> => {
          return User.findOne({ username }).then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                ' Username is already taken. Please try again.',
              );
            }
            return Promise.resolve();
          });
        },
      ),
    body('email', 'Please enter valid email!')
      .isEmail()
      .custom(
        (email, { req }): Promise<void> => {
          return User.findOne({ email }).then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'Email is already used,please user another one',
              );
            }
            return Promise.resolve();
          });
        },
      ),
    body(
      'password',
      'Please choose another password. It should be at least 12 characters long.',
    )
      .isLength({ min: 12 })
      .isAlphanumeric()
      .trim()
      .escape(),
    body('matchPassword')
      .trim()
      .isLength({ min: 12 })
      .isAlphanumeric()
      .escape()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Your passwords do not match.');
        }
        return true;
      }),
  ],
  signUp,
);

router.post(
  '/login',
  [
    body('email', 'Please enter valid email!')
      .isEmail()
      .custom(
        (email, { req }): Promise<void> => {
          return User.findOne({ email }).then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'Email is already used,please user another one',
              );
            }
            return Promise.resolve();
          });
        },
      ),
    body(
      'password',
      'Please choose another password. It should be at least 12 characters long.',
    )
      .isLength({ min: 12 })
      .isAlphanumeric()
      .trim()
      .escape(),
  ],
  login,
);
router.post('/confirmation/:token', confirmEmail);
router.post('request/confirmation', requestEmailConfirmation);
router.post('/test', (req, rest, next) =>
  rest.status(200).json({ test: 'nani' }),
);
export default router;
