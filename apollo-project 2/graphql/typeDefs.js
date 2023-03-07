const { gql } = require('apollo-server');

module.exports = gql`

type User {
	id: String!
	name: String!
	role: String!
	accessToken: String!
}

type Fruit {
	id: String!
	name: String!
	price: Float!
}

type Vegetable {
	id: String!
	name: String!
	price: Float!
}


type Query {
  vegetable(id: String!): Vegetable!
  vegetables: [Vegetable!]!
  fruit(id: String!): Fruit!
  fruits: [Fruit!]!
  login(loginUserInput: LoginUserInput!): User!
}


type Mutation {
  createVegetable(createVegetableInput: CreateVegetableInput!): Vegetable!
  updateVegetable(
    id: String!
    updateVegetableInput: UpdateVegetableInput!
  ): Vegetable!
  removeVegetable(id: String!): String!
  createFruit(createFruitInput: CreateFruitInput!): Fruit!
  updateFruit(id: String!, updateFruitInput: UpdateFruitInput!): Fruit!
  removeFruit(id: String!): String!
  createUser(createUserInput: CreateUserInput!): User!
}

input LoginUserInput {
  name: String!
  password: String!
}

input CreateVegetableInput {
  name: String!
  price: Float!
}

input UpdateVegetableInput {
  name: String
  price: Float
}

input CreateFruitInput {
  name: String!
  price: Float!
}

input UpdateFruitInput {
  name: String
  price: Float
}

input CreateUserInput {
  name: String!
  role: String!
  password: String!
}
`
