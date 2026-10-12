import express from "express";
import { getPartner } from "../controllers/partner.controller";

const partnerRouter=express.Router();

partnerRouter.get("/get",getPartner);

export default partnerRouter;