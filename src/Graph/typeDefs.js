import { gql } from 'apollo-server';
const typeDefs = gql`

type Card{
  id:ID,
  name:String,
  store:String,
  img:String,
  cardNumber:Float,
  isCutting:Boolean,
  bgColor:String,
  color:String
}

type User{
  id:ID
  name:String
  ID:String
  passwordHash:String
  token:String
  cards:[Card]
}

type Query {
  users:[User]!
  me:User  
  allusers:[User!]!
  cards:[Card!]!
  findUser(ID:String!): User
}

type Mutation {
  addCard(name:String!,store:String!,img:String!,cardNumber:Float!,isCutting:Boolean!,bgColor:String!,color:String!):Boolean!
  addCustomCard(name:String!,store:String!,img:String,cardNumber:Int!,isCutting:Boolean!,color:String,bgColor:String):Card
  removeUser(id:String!):Boolean!
  login(ID : String!, password: String!): User
  signup(ID : String!, password: String!, name:String!): Boolean!
  logout: Boolean!
}


`;

export default typeDefs;
// addCard(name:String!,store:String!,img:String!,cardNumber:Int!,isCutting:Boolean!):Boolean!
