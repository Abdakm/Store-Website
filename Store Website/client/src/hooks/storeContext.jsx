import { useState, createContext, useContext } from 'react';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [number, setNumber] = useState(4);

  return (
    <StoreContext.Provider value={{ number, setNumber }}>
      {children}
    </StoreContext.Provider>
  );
};