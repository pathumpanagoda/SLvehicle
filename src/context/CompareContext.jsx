import { createContext, useContext, useState } from 'react';

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (car) => {
    if (compareList.length >= 3) return { error: 'Max 3 cars in comparison' };
    if (compareList.find(c => c.id === car.id)) return { error: 'Already in comparison' };
    setCompareList(prev => [...prev, car]);
    return { success: true };
  };

  const removeFromCompare = (carId) => {
    setCompareList(prev => prev.filter(c => c.id !== carId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (carId) => compareList.some(c => c.id === carId);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be inside CompareProvider');
  return ctx;
};
