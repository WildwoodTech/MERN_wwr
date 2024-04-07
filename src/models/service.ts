import { model, Schema } from "mongoose";

interface IService {
  time: Date;
  seats: number;
  createdAt: Date;
}

const schema = new Schema<IService>({
  time: {
    type: Date,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Must be a postive number");
      }
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const serviceModel = model<IService>("Service", schema);

export default serviceModel;
