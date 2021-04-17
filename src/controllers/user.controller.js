import { v4 as uuidv4 } from 'uuid';
import User from "../models/User";
import { returnUserByToken } from "../middlewares/middleware";



export const refreshApiKey = async (req, res) => {
  const user = await returnUserByToken(req);
  const api_key = uuidv4();
  await User.updateOne({ _id: user._id },{ api_key} );
  return res.json({message:`success updated api_key  ${api_key}`});
};


export const getUser = async (req, res) => {
  const user = await returnUserByToken(req);
  return res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await returnUserByToken(req);
  await User.updateOne({ _id: user._id },{ 
    ...req.body,
    password: req.body.password ? await User.encryptPassword(req.body.password) : user.password,
   });
  return res.json({ user : await returnUserByToken(req) });
};

export const createAdmin = async (req, res) => {
  try {
    // Getting the Request Body
    const { password } = req.body;
    // Creating a new User Object
    const newUser = new User({
      ...req.body,
      api_key: uuidv4(),
      password: await User.encryptPassword(password),
    });

 
    const role = await Role.findOne({ name: "admin" });
     newUser.role = role._id;
    
    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token, newUser: newUser._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};