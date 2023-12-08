import { gql } from "graphql-tag";
import { DateTimeResolver } from "graphql-scalars";
const util = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type BatchPayload {
    count: Int
  }

  type StatusMessage {
    status: String
    id: String
  }

  enum Permission {
    View
    Edit
    Manage
    Owner
    Blocked
  }

  scalar DateTimeResolver
`;

export default util;
