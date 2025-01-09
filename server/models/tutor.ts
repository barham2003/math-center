import { model, Schema } from "mongoose";

interface IShift {
  from: Date;
  to: Date;
  day: string;
}
interface ITutor {
  email: string;
  name: string;
  shifts: IShift[];
}

const shiftSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  day: { type: String, required: true },
});

const tutorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  shifts: {
    type: [shiftSchema],
  },
}, { timestamps: true });

export const Tutor = model<ITutor>("Tutor", tutorSchema);
