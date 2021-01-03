import React, { FC } from "react";

import LinkByEmailPage from "./page";
import LinkByEmailProvider from "../../hooks/LinkByEmailContext";

const LinkByEmail: FC = () => {
  return (
    <LinkByEmailProvider>
      <LinkByEmailPage />
    </LinkByEmailProvider>
  );
};

export default LinkByEmail;
