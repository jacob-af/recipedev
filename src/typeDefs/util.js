import { gql } from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
const util = gql`
  type AuthPayload {
    token: String
    user: User
  }
  type AuthPayload {
    token: String
    user: User
  }

  type BatchPayload {
    count: Int
  }

  type StatusMessage {
    message: String
    code: String
  }

  enum Permission {
    View
    Edit
    Manager
    Owner
    Blocked
  }

  enum Relationship {
    Favorite
    Close
    Following
    Blocked
  }

  scalar DateTimeResolver
`;

export default util;
