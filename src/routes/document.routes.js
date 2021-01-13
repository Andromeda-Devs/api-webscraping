import { Router } from "express";
const router = Router();

import * as documentCtrl from "../controllers/document.controller";
import { authJwt } from "../middlewares";

router.get("/", documentCtrl.get);

router.get("/:documentId", documentCtrl.getDocumentById);

router.post(
  "/refresh-documents",
  [authJwt.verifyToken, authJwt.isModerator],
  documentCtrl.refreshDocuments
);

router.delete(
  "/:documentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  documentCtrl.deleteDocumentById
);

export default router;
