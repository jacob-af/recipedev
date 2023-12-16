import { gql } from "graphql-tag";

const crew = gql`
  type Crew {
    id: ID!
    name: String
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    permission: Permission
    build: [Build]
    User: [User]
    inventory: [Inventory]
    storage: [Storage]
    ingredient: [Ingredient]
    recipeBook: [RecipeBook]
  }

  type CrewReturn {
    crew: Crew
    permission: Permission
    status: StatusMessage
  }

  type CrewUser {
    crew: Crew
    user: User
    permission: Permission
  }

  type CrewBuild {
    crew: Crew
    build: Build
  }

  type CrewBuildReturn {
    crewBuild: CrewBuild
    status: StatusMessage
  }

  type CrewShareReturn {
    crewUser: CrewUser
    status: StatusMessage
  }

  type Mutation {
    newCrew(name: String!, description: String): CrewReturn

    editCrew(
      crewId: String!
      name: String!
      description: String
      permission: Permission!
    ): CrewReturn

    trashCrew(crewId: String!, permission: Permission!): CrewReturn

    addBuildToCrew(
      crewId: String!
      buildId: String!
      buildPermission: Permission
      bookPermission: Permission
    ): CrewBuildReturn

    removeBuildFromCrew(
      crewId: String!
      buildId: String!
      permission: Permission
    ): CrewBuildReturn

    changeCrewPermission(
      userId: String!
      crewId: String!
      permission: Permission
      userPermission: Permission
    ): CrewShareReturn

    removeCrewPermission(
      userId: String!
      crewId: String!
      permission: Permission
    ): CrewShareReturn
  }
`;

export default crew;
