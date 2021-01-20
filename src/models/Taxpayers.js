import { Schema, model } from "mongoose";

const TaxpayerSchema = new Schema(
  {
    
    taxpayer: { type: String, required: true },
    rut: { type: String, required: true },
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    location:{ type: String, required: true },
    user_id: 
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
  },
  {
    timestamps: true,
    //versionKey: false
  }
);

export default model("Taxpayer", TaxpayerSchema);
