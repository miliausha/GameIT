// UserContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  email: string;
  walletAddress: string;
}

interface UserContextProps {
  user: User | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ user, children }: { user: User | null; children: ReactNode }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};