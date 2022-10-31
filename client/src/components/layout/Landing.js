import React from "react";
import { userData } from "../../state/User";

function Landing(props) {
  const { userName, firstName, lastName, email } = userData();
  return (
    <div>
      <div>{userName}</div>
      <div>
        {firstName} {lastName}
      </div>
    </div>
  );
}

export default Landing;
