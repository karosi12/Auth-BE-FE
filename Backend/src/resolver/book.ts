import { Book } from "../models/Book";
import { User } from "../models/User";

const resolvers = {
  Query: {
    books: async () => {
      const books = await Book.findAll({order: [['updatedAt', 'DESC']], include: [User]})
      return books;
    },
  }
};

export default resolvers;