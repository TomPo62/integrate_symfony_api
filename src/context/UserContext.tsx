import { createContext, useState, useEffect, ReactNode, FC } from 'react';

// Définition des types
interface User {
  exp: number;
  roles: string[];
  username: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Créer le contexte
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Créer le fournisseur de contexte
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Charger l'utilisateur du localStorage lorsque l'application se charge
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Enregistrer l'utilisateur dans le localStorage lorsque l'utilisateur change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
