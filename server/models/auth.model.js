import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { genSalt, hash } = bcrypt;

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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
    default: "https://www.gravatar.com/avatar/default?s=200&d=mp",
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const salt = await genSalt(10); 
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;