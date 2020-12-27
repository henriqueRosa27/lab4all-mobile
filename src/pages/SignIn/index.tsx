import React, { FC } from "react";

import SignInProvider from "../../hooks/SignInContext";
import SignInPage from "./page";

const SignIn: FC = () => {
  return (
    <SignInProvider>
      <SignInPage />
    </SignInProvider>
  );
};

export default SignIn;
