const { gql } = require("apollo-server");

const crew = gql`
  type Crew {
    id: ID!
    name: String
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    crewUser: [CrewUser]
  }

  type CrewUser {
    crew: Crew
    user: User
    permission: Permission
  }
`;

module.exports = crew;
