import { createContext, ReactNode, useContext, useState } from "react";
import { CalendarDateData } from "../utils/date";

interface CoffeeChatContextType {
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: CalendarDateData;
  setSelectedDate: React.Dispatch<React.SetStateAction<CalendarDateData>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  selectedPlace: string;
  setSelectedPlace: React.Dispatch<React.SetStateAction<string>>;
  resetSelections: () => void;
}

const CoffeeChatContext = createContext<CoffeeChatContextType | undefined>(
  undefined
);

export const CoffeeChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<CalendarDateData>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const resetSelections = () => {
    setSelectedTitle("");
    setSelectedDate(null);
    setSelectedTime("");
    setSelectedPlace("");
  };
  return (
    <CoffeeChatContext.Provider
      value={{
        selectedTitle,
        setSelectedTitle,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedPlace,
        setSelectedPlace,
        resetSelections,
      }}
    >
      {children}
    </CoffeeChatContext.Provider>
  );
};

export const useCoffeeChat = (): CoffeeChatContextType => {
  const context = useContext(CoffeeChatContext);

  if (!context) {
    throw new Error("useCoffeeChat must be used within a CoffeeChatProvider");
  }

  return context;
};
