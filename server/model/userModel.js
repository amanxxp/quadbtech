import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
        type: String,
        required: [true, "Username is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
      },
      shoppingcart: {
        type: [String],
        default: [],
      },
    }
);
const User = mongoose.model("User", userSchema);
export default User;