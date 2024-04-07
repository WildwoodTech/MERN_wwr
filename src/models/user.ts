import { model, Schema } from "mongoose";
import validator from "validator";

interface IUser {
  name: string;
  email: string;
  serviceId: string;
  serviceTime: Date;
  userseats: number;
  userpin: number;
  nursery: number;
  twoyears: number;
  threeyears: number;
  fouryears: number;
  kindergarten: number;
  wildlife: number;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    serviceTime: {
      type: Date,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
      trim: true,
    },
    userseats: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      validate(value: number) {
        if (value < 0 && value > 10) {
          throw new Error("Must be greater than 0 but less than 10");
        }
      },
    },
    userpin: {
      type: Number,
      required: true,
    },
    nursery: {
      type: Number,
    },
    twoyears: {
      type: Number,
    },
    threeyears: {
      type: Number,
    },
    fouryears: {
      type: Number,
    },
    kindergarten: {
      type: Number,
    },
    wildlife: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userModel = model<IUser>("User", schema);

export default userModel;
