import React, { createContext, useContext, useState, ReactNode } from 'react';

// Step 1: Define the context shape with an interface
interface ResponseContextType {
  response: any; // Adjust the type according to what you expect your response to be
  setResponse: (response: any) => void; // Same here, adjust the type as needed
}

// Step 2: Provide a default value that matches the interface
const defaultContextValue: ResponseContextType = {
  response: null,
  setResponse: () => {}, // No-op function as a placeholder
};

const ResponseContext = createContext<ResponseContextType>(defaultContextValue);

export function useResponse() {
  return useContext(ResponseContext);
}

interface Props {
  children: ReactNode;
}

 const ResponseProvider: React.FC<Props> = ({ children }) => {
  const [response, setResponse] = useState<any>(null); // Adjust the type as necessary

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};
export default ResponseProvider