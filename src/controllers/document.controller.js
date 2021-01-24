import { User } from "../models";
import { eboleta } from "../web-scrapper/eboleta";

import {
  getTaxpayers,
  getTickets
} from '../web-scrapper/http';


export const getUserTaxpayers = async (req, res) => {

  const { rut } = req.params;

  const taxpayers = await getTaxpayers({ rut: "16593992-1" });

  res.status(200).json({

    taxpayers

  });

};
export const getDocumentByDates = async (req, res) => {

  const { from , to, invoice } = req.params;

  const tickets = await getTickets({

    taxpayer: "77022026",
    from: "2021-01-19",
    to: "2021-01-19",
    invoice: "5037"

  });

  res.status(200).json({

    tickets

  });

};

export const createDocuments = async (req, res) => {

  const {
    amount,
    type, 
    receiver,
    user,
    password
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
      detail: 'holi',
      receiver: { // send to body 
        rut: '12345-6',
        name: 'Jesus Ortiz',
        address: 'Unare',
        email: 'jesus@gmail.com'
      }
  });  

  res.status(200).json(url);
 
};


