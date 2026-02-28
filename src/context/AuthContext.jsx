import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('slv_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [savedCars, setSavedCars] = useState(() => {
    const stored = localStorage.getItem('slv_saved');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (currentUser) localStorage.setItem('slv_user', JSON.stringify(currentUser));
    else localStorage.removeItem('slv_user');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('slv_saved', JSON.stringify(savedCars));
  }, [savedCars]);

  const login = (email, password) => {
    // Mock auth — accept any credentials
    const mockUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      role: email.includes('seller') ? 'seller' : email.includes('admin') ? 'admin' : 'buyer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      phone: '',
      location: '',
      joinedDate: new Date().toLocaleDateString(),
    };
    setCurrentUser(mockUser);
    return { success: true, user: mockUser };
  };

  const register = (data) => {
    const newUser = {
      id: Date.now(),
      email: data.email,
      name: data.name,
      role: data.role || 'buyer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      phone: data.phone || '',
      location: data.location || '',
      joinedDate: new Date().toLocaleDateString(),
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setCurrentUser(null);

  const updateProfile = (updates) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const toggleSaveCar = (carId) => {
    setSavedCars(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const isCarSaved = (carId) => savedCars.includes(carId);

  return (
    <AuthContext.Provider value={{
      currentUser, login, logout, register, updateProfile,
      savedCars, toggleSaveCar, isCarSaved,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
