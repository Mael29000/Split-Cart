import React from "react";
import { Item } from "../components/types";

interface ShoppingListContextProps {
  shoppingList: Item[];
  setShoppingList: (shoppingList: Item[]) => void;
}

const initialState = {
  shoppingList: [],
  setShoppingList: (shoppingList: Item[]) => {},
};

const ShoppingListContext =
  React.createContext<ShoppingListContextProps>(initialState);

function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [shoppingList, setShoppingList] = React.useState<Item[]>([]);

  const value = {
    shoppingList,
    setShoppingList,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

const useShoppingList = () => {
  return React.useContext(ShoppingListContext);
};

export { ShoppingListProvider, useShoppingList };
