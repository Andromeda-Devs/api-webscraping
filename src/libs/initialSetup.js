import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const role = await Role.find({ name: "admin" });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      name:"admin",
      lastname:"admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      role: role._id,
      password_eboleta:"123456",
      rut:"123456",
    });
    console.log('Admin User Created!')
  }
};
