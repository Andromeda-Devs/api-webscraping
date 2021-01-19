import { Document,User } from "../models";
import { eboleta } from "../web-scrapper/eboleta";
export const refreshDocuments = async (req, res) => {
  // TODO:
  /**
   * se debe instalar bull para crear los jobs que actulizan los documentos de una persona,
   * el flujo deberia ser, juanito, pide que se refresquen sus documentos, 
   * si juanito no tiene documentos, el sistema debe hacer un insertMany, con la informacion
   * de los documentos de juanito desde un a;o atras de la fecha de realizada 
   * la peticion,en caso que juanito tenga documentos en el sistema debera traerse,
   *  los documentos, desde el ultimo documento 
   * insertado en la db en adelante, para eso debe hacer el siguiente comando en adelante 
   * 
   * Documents.find().sort({ _id: -1 }).limit(1);
   * 
   * este endpoint siempre debe retornar 200, porque se supone que es 
   * asyncrono y funciona  mediante un job, de redis
   */
  
};
export const getDocumentByDates = async (req, res) => {
  const { init, final } = req.params;
  
  const documents = await Document.find({
    date : {
      $gte: init ? new Date(init): null,
      $lt:  final ? new Date(final): new Date(),
    }
  });

  res.status(200).json(documents);

};

export const createDocuments = async (req, res) => {
  const {amount,type } = req.body;
  if(!amount || !type ) return res.status(404).json({ message:"amount or type invalid" });
  await eboleta.login({...req.body}); // TODO user and password get for database
  const url = await eboleta.emitTicket({
      amount: 78,
      type: 'Boleta Afecta', //Refactor code, for constants, evit typo
      receiver: {
          rut: '12345-6',
          name: 'Jesus Ortiz',
          address: 'Unare',
          email: 'jesus@gmail.com'
      }
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


export const deleteDocumentById = async (req, res) => {
  const { documentId } = req.params;

  await Document.findByIdAndDelete(documentId);
  // code 200 is ok too
  res.status(204).json({message: "succes delete "});
};
