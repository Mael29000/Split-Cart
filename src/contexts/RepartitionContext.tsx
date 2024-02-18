import React from "react";
import { Part } from "../components/types";

interface RepartitionContextProps {
  repartition: Part[];
  setRepartition: (repartition: Part[]) => void;
}

const initialState = {
  repartition: [],
  setRepartition: (repartition: Part[]) => {},
};

const RepartitionContext =
  React.createContext<RepartitionContextProps>(initialState);

export function RepartitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [repartition, setRepartition] = React.useState<Part[]>([]);

  const value = {
    repartition,
    setRepartition,
  };

  return (
    <RepartitionContext.Provider value={value}>
      {children}
    </RepartitionContext.Provider>
  );
}

export const useRepartition = () => {
  return React.useContext(RepartitionContext);
};
