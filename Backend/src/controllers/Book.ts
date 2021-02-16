import { Book } from '../models/Book';
import { User } from '../models/User';
import Responses from "../helper/responses";
const create = async (req, res) => {
  try {
    const { id } = req.decoded;
    const payload = req.body;
    payload.authorId =  id;
    const book = await Book.create(payload);
    if(!book) return res.status(400).send(Responses.error(400,'unable to create book')) 
    return res.status(201).send(Responses.success(201, 'book created', book))
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

const list = async (req, res) => {
  try {
    const books = await Book.findAll({include: [User]});
    if(!books) return res.status(400).send(Responses.error(400,'unable to fetch record')) 
    if(books.length === 0) return res.status(200).send({message: 'No record', data: []})
    return res.status(200).send(Responses.output(200,'Record retrieved',books)) 
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

export default { create, list }