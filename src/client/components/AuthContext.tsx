import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { ourAuth, Unsubscribe } from '../../../server';

type AuthContextData = {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // use this state throughout the app, to navigate
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // When app loads, see if user is logged in and unsubscribe immediately.
  // It has to be handled this way since auth.currentUser isn't by the time this runs
  useEffect(() => {
    let unsubscribe: Unsubscribe;

    const isAlreadySignedIn = async () => {
      unsubscribe = ourAuth.auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        if (user) {
          setIsSignedIn(true);
        }
      });
    };
    isAlreadySignedIn();
  }, []);

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
