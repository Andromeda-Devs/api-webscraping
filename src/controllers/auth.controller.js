import User from "../models/User";
import Role from "../models/Role";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import config from "../config";


export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const {username, email, password, password_eboleta ,rut } = req.body;
    // Creating a new User Object
    return res.send(req.body);

    const newUser = new User({
      username,
      email,
      password_eboleta,
      rut,
      api_key: uuidv4(),
      password: await User.encryptPassword(password),
    });
 
    const role = await Role.findOne({ name: "user" });
     newUser.role = role._id;
    
    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token, newUser: newUser._doc });
  } catch (error) {
    return res.status(500).send({error});
  }
};

export const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
