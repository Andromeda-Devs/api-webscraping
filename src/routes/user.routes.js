import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.post(
  "/refresh-api_key",
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
