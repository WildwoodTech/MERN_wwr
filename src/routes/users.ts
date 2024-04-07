import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  getUserUpdaterPin,
  updateUserSeatsByUpdaterPin,
  deleteUserByUpdaterPin,
  deleteUser,
  getStatistics,
} from '../controllers/users';

// Middleware
import authentication from '../middleware/authentication';
import statsAuthentication from '../middleware/statsAuthentication';

const userRouter = express.Router();

userRouter.route('/').get(authentication, getUsers).post(createUser);

userRouter.route('/stats').post(statsAuthentication, getStatistics);

userRouter
  .route('/:id')
  .get(authentication, getUser)
  .delete(authentication, deleteUser);

userRouter.route('/utils').post(getUserUpdaterPin);

userRouter
  .route('/utils/:userpin')
  .put(updateUserSeatsByUpdaterPin)
  .delete(deleteUserByUpdaterPin);

export default userRouter;
