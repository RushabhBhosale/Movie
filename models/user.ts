import { model, models, Schema } from "mongoose";

export interface LoginInterface {
  username: string;
  password: string;
}

export interface UserInterface extends LoginInterface {
  email: string;
}

const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = models.User || model<UserInterface>("User", userSchema);
export default User;
