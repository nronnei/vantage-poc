import React, { createContext, useContext } from 'react';

const InjectionContext = createContext({});

export function useInjection() {
  return useContext(InjectionContext);
}

type ServiceProps = Record<string, any>;
export function InjectionProvider({ children, ...services }: React.PropsWithChildren<ServiceProps>) {
  return (
    <InjectionContext.Provider value={services}>
      {children}
    </InjectionContext.Provider>
  )
}
