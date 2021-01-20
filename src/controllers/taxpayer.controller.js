import jwt from "jsonwebtoken";
import config from "../config";
import { Taxpayer } from "../models";

export const createTaxpayer = async (req, res) => {
  try {
    let token = req.headers["x-access-token"];
   // const decoded = jwt.verify(token, config.SECRET);

   // const user = await User.findById(decoded.id);
    // creating a new Taxpayer
    const taxpayer = new Taxpayer({
        ...req.body,
     //   user_id:decoded.id
    });
    // saving the new Taxpayer
    const savedTaxpayer = await taxpayer.save();

    return res.status(200).json({
      ...savedTaxpayer
    });
  } catch (error) {
    console.error(error);
    return  res.status(500).json({
      ...error
    });
  }
};

export const getTaxpayers = async (req, res) => {};

export const getTaxpayer = async (req, res) => {
  res.json("hola");
};
