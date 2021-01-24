import { Router } from "express";
const router = Router();

import * as documentCtrl from "../controllers/document.controller";
import { authJwt } from "../middlewares";


router.get("/tickets", documentCtrl.getDocumentByDates);

router.post("/create-eboleta", documentCtrl.createDocuments);

router.post("/login-clave-unica", documentCtrl.loginClaveUnica );

//router.get("/:documentId", documentCtrl.getDocumentById);



router.post(
  "/refresh",
  [authJwt.verifyToken, authJwt.isModerator],
  documentCtrl.refreshDocuments
);

router.delete(
  "/:documentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  documentCtrl.deleteDocumentById
);

export default router;
