import userModel from '../models/user';
import serviceModel from '../models/service';
import Mailer from '../utils/mailer';
import db from '../database/db';
import genToken from '../utils/genToken';
import { ExpressHandler } from '../types';

// @desc    Get all users
// @route   GET /api/v5/users
// @access  Private
export const getUsers: ExpressHandler = async (req, res, next) => {
  try {
    const users = await userModel.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Get single user
// @route   GET /api/v5/users/:id
// @access  Private
export const getUser: ExpressHandler = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with id: ${req.params.id} not found!`,
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Create new user
// @route   POST /api/v5/users
// @access  Public
export const createUser: ExpressHandler = async (req, res, next) => {
  const session = await db.startSession();
  session.startTransaction();
  try {
    // Generate random updater pin for users and check for uniqueness
    let generatedToken = 0;
    let notUnique = true;
    while (notUnique) {
      generatedToken = genToken();
      let found = await userModel.findOne({ userpin: generatedToken });

      if (!found) {
        notUnique = false;
      }
    }

    req.body.userpin = generatedToken;

    const service = await serviceModel.findById(req.body.serviceId);
    if (!service) {
      throw new Error();
    }

    req.body.serviceTime = service.time;

    const user = await userModel.create([req.body], {
      session,
    });

    if (!req.body.userseats) {
      throw new Error();
    }

    service.seats = service.seats - req.body.userseats;

    await service.save({ session });

    await session.commitTransaction();
    session.endSession();
    req.io?.emit('userUpdate');
    Mailer(
      req.body.email!,
      req.body.name!,
      'CREATE',
      req.body.serviceTime!,
      req.body.userseats!,
      req.body.userpin!
    );

    res.status(200).json({ success: true, data: user, service });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Update single user
// @route   POST /api/v5/users/utils
// @access  Private
export const getUserUpdaterPin: ExpressHandler = async (req, res, next) => {
  try {
    const useremail = req.body.email;
    if (!useremail) {
      throw new Error();
    }

    const user = await userModel.findOne({ email: useremail });
    if (!user) {
      throw new Error('user not found');
    }
    Mailer(
      user.email!,
      user.name!,
      'REQUEST',
      user.serviceTime!,
      user.userseats!,
      user.userpin!
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update single user
// @route   PUT /api/v5/users/utils/:userpin
// @access  Private
export const updateUserSeatsByUpdaterPin: ExpressHandler = async (
  req,
  res,
  next
) => {
  const session = await db.startSession();
  session.startTransaction();

  try {
    const userpin = parseInt(req.params.userpin);
    if (!userpin) {
      throw new Error('missing userpin');
    }

    if (!req.body.newServiceId || !req.body.userseats) {
      throw new Error('missing data');
    }

    // find user by their updater pin
    const user = await userModel.findOne({ userpin: userpin });
    if (!user) {
      throw new Error('user with that pin not found');
    }

    // find the service the user is 'currently' signed up for
    const oldService = await serviceModel.findById(user.serviceId);
    if (!oldService) {
      throw new Error();
    }

    if (oldService._id.toString() == req.body.newServiceId) {
      oldService.seats =
        oldService.seats + (user.userseats - req.body.userseats);
      await oldService.save({ session });
    } else {
      // find the new service the user wants to go to; just checked if 'same'
      const newService = await serviceModel.findById(req.body.newServiceId);
      if (!newService) {
        throw new Error();
      }

      oldService.seats += user.userseats;
      await oldService.save({ session });

      newService.seats -= req.body.userseats;
      await newService.save({ session });

      user.serviceTime = newService.time;
    }

    user.userseats = req.body.userseats;
    user.serviceId = req.body.newServiceId;
    await user.save({ session });
    await session.commitTransaction();
    session.endSession();
    req.io?.emit('userUpdate');
    Mailer(
      user.email!,
      user.name!,
      'UPDATE',
      user.serviceTime!,
      user.userseats!,
      user.userpin!
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Delete single user
// @route   DELETE /api/v5/users/:id
// @access  Private
export const deleteUser: ExpressHandler = async (req, res, next) => {
  const session = await db.startSession();
  session.startTransaction();

  try {
    const userid = req.params.id;
    if (!userid) {
      throw new Error('missing id');
    }

    const user = await userModel.findByIdAndDelete([userid], {
      session,
    });
    if (!user) {
      throw new Error();
    }

    const service = await serviceModel.findById(user.serviceId);
    if (!service) {
      throw new Error();
    }

    service.seats = service.seats + user.userseats;
    await service.save({ session });

    await session.commitTransaction();
    session.endSession();
    req.io?.emit('userUpdate');
    res.status(200).json({ success: true, data: user, service });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, error });
  }
};

// @desc    Delete single user
// @route   DELETE /api/v5/users/utils/:userpin
// @access  Private
export const deleteUserByUpdaterPin: ExpressHandler = async (
  req,
  res,
  next
) => {
  const session = await db.startSession();
  session.startTransaction();

  try {
    const userpin = parseInt(req.params.userpin);
    if (!userpin) {
      throw new Error('missing userpin');
    }

    const user = await userModel.findOneAndDelete(
      {
        userpin: userpin,
      },
      { session }
    );
    if (!user) {
      throw new Error('user with that pin not found');
    }

    const service = await serviceModel.findById(user.serviceId);
    if (!service) {
      throw new Error();
    }

    service.seats = service.seats + user.userseats;
    await service.save({ session });

    await session.commitTransaction();
    session.endSession();
    req.io?.emit('userUpdate');
    res.status(200).json({ success: true, data: user, service });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Get user stats
// @route   GET /api/v5/users/stats
// @access  Private
export const getStatistics: ExpressHandler = async (req, res, next) => {
  let statsObject: { childrensStatistics: any[] } = { childrensStatistics: [] };
  try {
    // Get seat total
    // const seatTotal = await User.aggregate([
    //   { $group: { _id: '', total_seats: { $sum: '$seats' } } },
    //   { $project: { _id: 0, total_seats: 1 } },
    // ]);
    // statsObject.seatStatistics.push(seatTotal[0]);

    // Get children sign ups per service and category
    const services = await serviceModel.find();
    for (const service of services) {
      const data = await userModel.aggregate([
        { $match: { serviceId: `${service._id}` } },
        {
          $group: {
            _id: '',
            nursery: { $sum: '$nursery' },
            twoyears: { $sum: '$twoyears' },
            threeyears: { $sum: '$threeyears' },
            fouryears: { $sum: '$fouryears' },
            kindergarten: { $sum: '$kindergarten' },
            wildlife: { $sum: '$wildlife' },
          },
        },
        {
          $project: {
            _id: 0,
            nursery: 1,
            twoyears: 1,
            threeyears: 1,
            fouryears: 1,
            kindergarten: 1,
            wildlife: 1,
          },
        },
      ]);
      const serviceTime = service.time.toLocaleDateString('en-US', {
        timeZone: 'America/Los_Angeles',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      statsObject.childrensStatistics.push({
        service: serviceTime,
        signUps: data[0],
      });
    }

    res.status(200).json(statsObject);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
