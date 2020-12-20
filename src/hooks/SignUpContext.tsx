import React, {
  FC,
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext
} from "react";

interface signUpCredentials {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface SignUpContextData {
  loading: boolean;
  singUp(credentials: signUpCredentials): Promise<void>;
}

interface SingUpProviderProps {
  children: ReactNode;
}

const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

const SignUpProvider: FC<SingUpProviderProps> = ({
  children
}: SingUpProviderProps) => {
  const [loading, setLoading] = useState(false);
  const singUp = useCallback(async ({ name, surname, email, password }) => {
    console.log({ name, surname, email, password });
  }, []);
  return (
    <SignUpContext.Provider value={{ loading, singUp }}>
      {children}
    </SignUpContext.Provider>
  );
};

export function useSignUp(): SignUpContextData {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error("useAuth must be used within a SingUpProviderProps");
  }

  return context;
}

export default SignUpProvider;
