import { createContext, useContext, ReactNode, useState } from "react";

interface ItemContextType {
  itemId: string;
  setItemId: React.Dispatch<React.SetStateAction<string>>;
}

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined
);

export const ItemContextProvider = ({ children }: { children: ReactNode }) => {
  const [itemId, setItemId] = useState<string>("");

  return (
    <ItemContext.Provider value={{ itemId, setItemId }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within ItemContextProvider");
  }
  return context;
};
