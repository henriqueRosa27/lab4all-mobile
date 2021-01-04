import React, { FC } from "react";

import CreateActivityPage from "./page";
import CreateActivityProvider from "../../hooks/CreateActivityContext";

const SignUp: FC = () => {
  return (
    <CreateActivityProvider>
      <CreateActivityPage />
    </CreateActivityProvider>
  );
};

export default SignUp;
