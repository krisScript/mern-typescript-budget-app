import express from 'express';
import { body } from 'express-validator/check';
import User from '../models/User';
import isAuth from '../middleware/isAuth';
import clearCacheByUserId from '../middleware/clearCacheByUserId';
import {
  addExpense,
  deleteExpense,
  editExpense,
  getExpenses,
} from '../controllers/expense';
const router = express.Router();

router.post(
  '/expense',
  [
    body('title', 'Please enter title that is at lest 4 characters long.')
      .isLength({ min: 4 })
      .trim()
      .escape(),
    body(
      'description',
      'Please enter description that is at lest 20 characters long.',
    )
      .isLength({ min: 4 })
      .trim()
      .escape(),
    body('cost', 'Please enter valid number')
      .isLength({ min: 1 })
      .isNumeric()
      .trim()
      .escape(),
  ],
  isAuth,
  clearCacheByUserId,
  addExpense,
);
router.delete('/expense/:expenseId', isAuth, clearCacheByUserId, deleteExpense);
router.put(
  '/expense/:expenseId',
  [
    body('title', 'Please enter title that is at lest 4 characters long.')
      .isLength({ min: 4 })
      .trim()
      .escape(),
    body(
      'description',
      'Please enter description that is at lest 20 characters long.',
    )
      .isLength({ min: 4 })
      .trim()
      .escape(),
    body('cost', 'Please enter valid number')
      .isLength({ min: 1 })
      .isNumeric()
      .trim()
      .escape(),
  ],
  isAuth,
  clearCacheByUserId,
  editExpense,
);

router.get('/expenses', isAuth, getExpenses);
export default router;
