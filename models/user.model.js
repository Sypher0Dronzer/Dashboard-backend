import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    projects: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "contributor"],
      default: "contributor",
    },
    profileImg:{
      type:String,
      default:'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
