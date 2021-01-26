import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const returnUserByToken = async (req) => {
  let token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, config.SECRET);
    const user = await User.findOne({_id: decoded.id});
    return user;
  } catch (error) {
    return false;
  }
};

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const user = await returnUserByToken(req);
    if (!user) return res.status(404).json({ message: "No user found" });   
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};


export const isAdmin = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const user = await returnUserByToken(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });   
    const role = Role.findOne({_id: user.role});
    if (role.name != "admin") return res.status(401).json({ message: "Unauthorized,not admin" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
