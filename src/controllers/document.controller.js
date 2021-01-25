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
  } = req.body;

  if( !amount ) 
    return res.status(404).json({ message:"amount or type invalid" });

  await eboleta.login({
    user: user.rut,
    password: user.password_eboleta,
  }); // TODO user and password get for database

  const url = await eboleta.emitTicket({
      amount,
      type, //Refactor code, for constants, evit typo, Boleta Afecta
      detail,
      receiver,
  });  
  res.status(200).json(url);
 
};

export const loginClaveUnica = async(req,res) => {

  const {
    user,
    password
  } = req.body;

  //This method signs in to clave unica page 
  //and grabs response body from info request
  //and returns it as an object
  const profile = await claveUnica.login({
    user,
    password
  });

  return res.json({
    profile
  });

}


