import { v4 as uuidv4 } from 'uuid';
import User from "../models/User";
import returnUserByToken from "../middlewares/middleware";



export const refreshApiKey = async (req, res) => {
  const user = await returnUserByToken(req);
  const api_key = uuidv4();
  await User.updateOne(user._id,{ set: {api_key} });
  return response.json({message:`success updated api_key  ${api_key}`});
};

export const getUser = async (req, res) => {
  const user = await returnUserByToken(req);
  return response.json({...user.doc});
};
