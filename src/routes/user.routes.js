import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup} from "../middlewares";

router.post(
  "/refresh-api-key",
  [
    authJwt.verifyToken,
    verifySignup.checkDuplicateUsernameOrEmail,
    authJwt.isAdmin,
  ],
  usersCtrl.refreshApiKey
);

router.post(
  "/create-admin",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  usersCtrl.createAdmin,
);

router.put(
  "/update",
  [
    authJwt.verifyToken,
  ],
  usersCtrl.updateUser
);



router.get(
  "/",
  [
    authJwt.verifyToken
  ],
  usersCtrl.getUser
);

export default router;
