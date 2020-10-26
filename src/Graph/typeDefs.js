import { gql } from 'apollo-server';
const typeDefs = gql`

type Card{
  _id:ID,
  name:String,
  store:String,
  img:String,
  cardNumber:String,
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
  mydata:User!
}

type Mutation {
  addCard(name:String!,store:String!,img:String!,cardNumber:String!,isCutting:Boolean!,bgColor:String!,color:String!):Boolean!
  addCustomCard(name:String!,store:String!,img:String,cardNumber:String!,isCutting:Boolean!,color:String,bgColor:String):Card
  mutationCard(key:ID!,name:String!,cardNumber:String!):Boolean!
  removeCard(key:ID!):Boolean!
  removeUser(id:String!):Boolean!
  login(ID : String!, password: String!): User
  signup(ID : String!, password: String!, name:String!): Boolean!
  logout: Boolean!
}


`;

export default typeDefs;
// addCard(name:String!,store:String!,img:String!,cardNumber:Int!,isCutting:Boolean!):Boolean!
