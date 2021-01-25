import { Router } from "express";
const router = Router();

import * as documentCtrl from "../controllers/document.controller";
import { authJwt } from "../middlewares";


router.get("/tickets/:taxpayer/:from/:to", documentCtrl.getDocumentByDates);
router.get("/taxprayers", documentCtrl.getUserTaxpayers);

router.post("/create-eboleta", documentCtrl.createDocuments);
router.post("/clave-unica",documentCtrl.loginClaveUnica);

export default router;
