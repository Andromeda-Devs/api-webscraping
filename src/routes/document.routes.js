import { Router } from "express";
const router = Router();

import * as documentCtrl from "../controllers/document.controller";


router.get("/taxpayers", documentCtrl.getUserTaxpayers);
router.get("/tickets/:taxpayer/:from/:to", documentCtrl.getDocumentByDates);

router.post("/create-eboleta", documentCtrl.createDocuments);
router.post("/clave-unica",documentCtrl.loginClaveUnica);

router.post("/master-eboleta/:api_key_master", documentCtrl.createDocumentsMaster);
router.post("/master-clave-unica/:api_key_master",documentCtrl.loginClaveUnicaMaster);


export default router;
