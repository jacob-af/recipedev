import { gql } from "graphql-tag";

const recipeBook = gql`
  type RecipeBook {
    id: ID!
    name: String
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    build: [Build]
    completeBuild: [CompleteBuild]
  }

  type RecipeBookUser {
    user: User
    recipeBook: RecipeBook
    permission: Permission
  }

  type BookReturn {
    status: String
    recipeBook: RecipeBook
  }

  type RecipeBookBuild {
    recipeBook: [RecipeBook]
    build: [Build]
  }

  type Recipe {
    id: ID!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    name: String
    origin: String
    createdBy: User
    editedBy: User
    history: String
    build: [Build]
  }

  type CompleteBuild {
    id: ID!
    buildName: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    recipeId: String
    recipeName: String
    recipeOrigin: String
    recipeCreatedBy: User
    recipeHistory: String
    instructions: String
    notes: String
    glassware: String
    ice: String
    touch: [Touch]
  }
`;

export default recipeBook;
