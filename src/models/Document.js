import { Schema, model } from "mongoose";

const DocumentSchema = new Schema(
  {
    number_invoice: { type: String, required: true,},
    ticket: { type: String, required: true },
    price: { type: String, required: true },
    iva:{ type: String, required: true },
    total:{ type: String, required: true },
    type: { type: String, required: true },
    type: { type: String, required: true },
    seller: { type: String, required: true },
    date: { type: Date, required: true }, 
    branch_office: { type: String, required: true },
    action: { type: String, required: true },
    stream: { type: String },
    user_id: 
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Document", DocumentSchema);
