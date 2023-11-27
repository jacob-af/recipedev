const { gql } = require("apollo-server");
const { DateTimeResolver } = require("graphql-scalars");
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
    id: Int
  }

  enum Permission {
    View
    Comment
    Edit
    Manage
    Own
    Blocked
  }

  scalar DateTimeResolver
`;

module.exports = util;
