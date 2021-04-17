import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    lastname: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone:{
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      required: true,
    },
    rut:{
      type: String,
      required: true,
    },
    password_eboleta:{
      type: String,
    },
    user_clave_unica:{
      type: String,
    },
    password_clave_unica:{
      type: String,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    api_key: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", UserSchema);
