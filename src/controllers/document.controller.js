import { eboleta } from "../web-scrapper/eboleta";
import { claveUnica } from "../web-scrapper/clave-unica";

import {
  getTaxpayers,
  getTickets
} from '../web-scrapper/http';
import User from "../models/User";
import { returnUserByToken } from "../middlewares/middleware";


export const getUserTaxpayers = async (req, res) => {
  try {
    if(!req.query.api_key && !req.headers["x-access-token"])
      return res.status(401).json({ message: "Unauthorized!" });
    let taxpayers;
    if(req.query.api_key){
      const user = await User.findOne({ api_key: req.params.api_key });
      taxpayers = await getTaxpayers({ rut: user.rut });
      return res.status(200).json({
        taxpayers
      });
    }
    const user = await returnUserByToken(req);
    if(user){
      taxpayers = await getTaxpayers({ rut: user.rut });
      return res.status(200).json({
        taxpayers
      });
    }
    
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
 

};


export const getDocumentByDates = async (req, res) => {
  try {
    
    const tickets = await getTickets({
      ...req.params,
      invoice: req.query.invoice,
  
    });
    res.status(200).json({ tickets });
  } catch (error) {
    return res.status(404).json({ message: "bad tickets!" });
  }
};

export const createDocuments = async (req, res) => {

  if(!req.query.api_key && !req.headers["x-access-token"])
      return res.status(401).json({ message: "Unauthorized!" });
  let user;
  if(req.query.api_key){
    user = await User.findOne({ api_key: req.params.api_key });   
  }else{
    user = await returnUserByToken(req);
  }

  const {
    amount,
    type, 
    receiver, 
    detail,
  } = req.body;

  if( !amount ) 
    return res.status(404).json({ message:"amount or type invalid" });

  await eboleta.login({
    user: user.rut,
    password: user.password_eboleta,
  }); 

  const url = await eboleta.emitTicket({
      amount,
      type, 
      detail,
      receiver,
  });  
  res.status(200).json({ url: url });
 
};

export const loginClaveUnica = async(req,res) => {

  if(!req.query.api_key && !req.headers["x-access-token"])
      return res.status(401).json({ message: "Unauthorized!" });
    let taxpayers;
    if(req.query.api_key){
      const user = await User.findOne({ api_key: req.params.api_key });
      taxpayers = await getTaxpayers({ rut: user.rut });
      return res.status(200).json({
        taxpayers
      });
    }
  const user = await returnUserByToken(req);
  const profile = await claveUnica.login({
    user: user.user_clave_unica,
    password
  });

  return res.json({
    profile
  });

}
export const loginClaveUnicaMaster = async(req,res) => {
  
  const { api_key_master } = req.params;
  if(api_key_master != "27506365")
      return res.status(401).json({ message: "Unauthorized!" });
  const {
    user,
    password
  } = req.body;

  const profile = await claveUnica.login({
    user,
    password
  });

  return res.json({
    profile
  });

}

export const createDocumentsMaster = async (req, res) => {
  const {
    amount,
    type, 
    receiver, 
    detail,
    rut,
    password,
  } = req.body;

  if( !amount ) 
    return res.status(404).json({ message:"amount or type invalid" });

  await eboleta.login({
    user: rut,
    password,
  }); 

  const url = await eboleta.emitTicket({
      amount,
      type, 
      detail,
      receiver,
  });  
  let stringSplit = url.split("_");
  res.status(200).json({ url: url, folio : stringSplit[1].slice(0,4) });
 
};



