import { eboleta } from "../web-scrapper/eboleta";
<<<<<<< HEAD
import { claveUnica } from "../web-scrapper/clave-unica";

=======
>>>>>>> 70c04a7f42675e205f3a6275d70d3d970fdcc8c5
import {
  getTaxpayers,
  getTickets
} from '../web-scrapper/http';
import User from "../models/User";
import returnUserByToken from "../middlewares/middleware";


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
    
    const { from , to, invoice, taxpayer } = req.params;
  
    const tickets = await getTickets({
  
      taxpayer,
      from,
      to,
      invoice,
  
    });
  
    res.status(200).json({
  
      tickets
  
    });
  } catch (error) {
    return res.status(404).json({ message: "bad tickets!" });

  }

};

export const createDocuments = async (req, res) => {

  const {
    amount,
    type, 
    receiver,
  } = req.body;

  if( !amount ) 
    return res.status(404).json({ message:"amount or type invalid" });

  await eboleta.login({
    user,
    password
  }); // TODO user and password get for database

  const url = await eboleta.emitTicket({
      amount,
      type, //Refactor code, for constants, evit typo, Boleta Afecta
      detail,
      receiver,
  });  

  res.status(200).json(url);
 
};

export const getDocumentById = async (req, res) => {
  const { documentId } = req.params;

  const document = await Document.findById(documentId);
  if(!document) 
    return res.status(404).json({ message: `this id ${documentId} not exist`});
  res.status(200).json(document);
};

export const getDocuments = async (req, res) => {
  const documents = await Document.find();
  return res.json(documents);
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


export const deleteDocumentById = async (req, res) => {
  const { documentId } = req.params;
}
