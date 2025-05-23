import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  comparePassword: (pw: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (pw: string) {
  return bcrypt.compare(pw, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
