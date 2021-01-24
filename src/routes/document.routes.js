import { Router } from "express";
const router = Router();

import * as documentCtrl from "../controllers/document.controller";
import { authJwt } from "../middlewares";


router.get("/tickets", documentCtrl.getDocumentByDates);
router.get("/taxprayers", documentCtrl.getUserTaxpayers);

router.post("/create-eboleta", documentCtrl.createDocuments);

<<<<<<< HEAD
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

=======
>>>>>>> 70c04a7f42675e205f3a6275d70d3d970fdcc8c5
export default router;
