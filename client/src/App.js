import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useQuery, gql } from "@apollo/client";
import Button from "@mui/material/Button";
import { css } from "@emotion/css";

const GET_USERS = gql`
  query AllUsers {
    allUsers {
      id
      userName
      firstName
      lastName
    }
  }
`;

function DisplayUsers() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data.allUsers);
  return data.allUsers.map(({ id, userName, firstName, lastName }) => (
    <div key={id}>
      <Button
        variant="contained"
        color="error"
        className={css`
          padding: 32px;
          border-color: red;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: black;
          }
        `}
      >
        {userName}
      </Button>
      <br />
      <b>full user name</b>
      <p>
        {firstName} {lastName}
      </p>
      <br />
    </div>
  ));
}

function App() {
  return (
    <div
      className={css`
        display: flex;
        align-content: center;
      `}
    >
      <div>
        <h2
          className={css`
            text-align: center;
          `}
        >
          My first Apollo app 🚀
        </h2>
      </div>
      <br />
      <DisplayUsers />
    </div>
  );
}

export default App;
