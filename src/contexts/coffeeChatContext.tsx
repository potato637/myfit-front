import { createContext, ReactNode, useContext, useState } from "react";
import { CalendarDateData } from "../utils/date";

interface CoffeeChatContextType {
  selectedDate: CalendarDateData;
  setSelectedDate: React.Dispatch<React.SetStateAction<CalendarDateData>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

const CoffeeChatContext = createContext<CoffeeChatContextType | undefined>(
  undefined
);

export const CoffeeChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<CalendarDateData>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <CoffeeChatContext.Provider
      value={{ selectedDate, setSelectedDate, selectedTime, setSelectedTime }}
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
