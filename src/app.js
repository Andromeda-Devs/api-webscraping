import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import documentRoutes from "./routes/document.routes";
import usersRoutes from "./routes/user.routes";
//import authRoutes from "./routes/auth.routes";

import { createRoles, 
//  createAdmin
} from "./libs/initialSetup";

const app = express();
createRoles();
//createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "ok"
  });
});

// Routes
app.use("/api/documents", documentRoutes);
app.use("/api/users", usersRoutes);
//app.use("/api/auth", authRoutes);

export default app;
