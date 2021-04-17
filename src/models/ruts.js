import { Schema, model } from "mongoose";


const RutSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    lastname: {
      type: String,
      unique: true,
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
    },
    password: {
      type: String,
      required: true,
    },
    rut:{
      type: String,
      required: true,
    },
    password_eboleta:{
      type: String,
      required: true,
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

export default model("Rut", RutSchema);
