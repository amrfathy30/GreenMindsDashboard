/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext<any>(null);

export const AdminProvider = ({ children }: any) => {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("GMadminData");
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  const updateAdmin = (data: any) => {
    setAdmin(data);
    localStorage.setItem("GMadminData", JSON.stringify(data));
  };

  return (
    <AdminContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
