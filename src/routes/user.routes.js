import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.post(
  "/",
  [
    authJwt.verifyToken
  ],
  usersCtrl.refreshApiKey
);

router.get(
  "/",
  [
    authJwt.verifyToken
  ],
  usersCtrl.getUser
);

export default router;
