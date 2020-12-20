import React, { FC } from "react";

import SignUpPage from "./page";
import SingUpProvider from "../../hooks/SignUpContext";

const SignUp: FC = () => {
  return (
    <SingUpProvider>
      <SignUpPage />
    </SingUpProvider>
  );
};

export default SignUp;
