import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterState {
  region: string;
  employmentStatus: string;
  keywords: string[];
  keywordInput: string;
  highSectorText: string;
  lowSectorText: string;
}

interface FilterContextType {
  filterState: FilterState;
  updateRegion: (region: string) => void;
  updateEmploymentStatus: (status: string) => void;
  updateKeywords: (keywords: string[]) => void;
  updateKeywordInput: (input: string) => void;
  updateJobPreference: (high: string, low: string) => void;
  resetFilter: () => void;
}

const defaultFilterState: FilterState = {
  region: '',
  employmentStatus: '',
  keywords: [],
  keywordInput: '',
  highSectorText: '',
  lowSectorText: '',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  const updateRegion = (region: string) => {
    setFilterState(prev => ({ ...prev, region }));
  };

  const updateEmploymentStatus = (employmentStatus: string) => {
    setFilterState(prev => ({ ...prev, employmentStatus }));
  };

  const updateKeywords = (keywords: string[]) => {
    setFilterState(prev => ({ ...prev, keywords }));
  };

  const updateKeywordInput = (keywordInput: string) => {
    setFilterState(prev => ({ ...prev, keywordInput }));
  };

  const updateJobPreference = (highSectorText: string, lowSectorText: string) => {
    setFilterState(prev => ({ ...prev, highSectorText, lowSectorText }));
  };

  const resetFilter = () => {
    setFilterState(defaultFilterState);
  };

  return (
    <FilterContext.Provider
      value={{
        filterState,
        updateRegion,
        updateEmploymentStatus,
        updateKeywords,
        updateKeywordInput,
        updateJobPreference,
        resetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}