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
    crewUser: [CrewUser]
  }

  type CrewUser {
    crew: Crew
    user: User
    permission: Permission
  }
`;

export default crew;
