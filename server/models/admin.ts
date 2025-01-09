import { model, Schema } from "mongoose";
interface IAdmin {
  name: string;
  email: string;
  picture?: string;
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: String,
});

export const Admin = model("Admin", adminSchema);
