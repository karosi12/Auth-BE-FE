const typeDefs = `
type Book {
  id: ID! # the ! means that every object _must_ have an id
  title: String
  description: String
  authorId: Int
  author: User
}

type Query {
  books: [Book]
}

type User {
  id: ID!
  fullName: String
  password: String
  email: String
  createdAt: String
}

schema {
  query: Query
}
`
export default typeDefs;