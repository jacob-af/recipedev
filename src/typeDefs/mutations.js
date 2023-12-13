import { gql } from "graphql-tag";

const mutation = gql`
  type Mutation {
    addRecipe(
      name: String
      origin: String
      createdById: String
      history: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): RecipeResponse

    createCrew(name: String!, description: String): Crew

    login(email: String!, password: String!): AuthPayload

    signup(
      userName: String!
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): AuthPayload
  }
`;

export default mutation;
