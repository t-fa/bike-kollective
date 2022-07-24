import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { isUserSignedIn } from '../firebase/authentication';

type AuthContextData = {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // is user signed in via Firebase?
  const [isSignedIn, setIsSignedIn] = useState<boolean>(isUserSignedIn());

  // To navigate from authentication screens to the main screens,
  // this state needs to be updated. Once it is,
  // the navigation will happen automatically.
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
