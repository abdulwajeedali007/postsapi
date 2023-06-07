import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static method for login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email is not correct");
  }
  const pwd = await bcrypt.compare(password, user.password);
  if (!pwd) {
    throw Error("Password is not correct");
  }

  return user;
};

// static method for signup
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All field are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exits = await this.findOne({ email });
  if (exits) {
    throw Error("User already exits");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

export default mongoose.model("User", userSchema);
