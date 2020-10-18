import { gql } from 'apollo-server';
const typeDefs = gql`

type Card{
  id:ID!,
  name:String,
  store:String,
  img:String,
  cardNumber:Int,
  isCutting:Boolean,
}
type User{
  id:ID!
  name:String
  ID:String!
  passwordHash:String
  role:[String!]! 
  token:String
  cards:[Card]
}

type Query {
  users:[User]!
  me:User  
  allusers:[User]!
}

type Mutation {
  addCard(name:String!,store:String!,img:String!,cardNumber:Int!,isCutting:Boolean!):Card
  addCustomCard(name:String!,store:String!,img:String,cardNumber:Int!,isCutting:Boolean!,color:String,bgColor:String):Card
  addUser(ID:String!,password:String!):User
  login(ID : String!, password: String): User
  signup(ID : String!, password: String!, name:String!): Boolean!
  logout: Boolean!
}


`;

export default typeDefs;
